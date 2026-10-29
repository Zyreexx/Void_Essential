import os
import csv
import io
import logging
import redis
from celery import Celery

logger = logging.getLogger(__name__)

def make_celery(app_name=__name__):
    redis_url = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
    celery = Celery(
        app_name,
        broker=redis_url,
        backend=os.getenv("CELERY_RESULT_BACKEND", redis_url)
    )
    celery.conf.update(
        task_serializer="json",
        result_serializer="json",
        accept_content=["json"],
        timezone="UTC",
        enable_utc=True,
        broker_connection_retry_on_startup=False,
        broker_connection_timeout=1.0,
    )
    return celery

celery_app = make_celery("void_tasks")

def is_redis_available():
    """Quick 0.3s probe to see if Redis broker is actively reachable."""
    try:
        r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"), socket_timeout=0.3)
        return bool(r.ping())
    except Exception:
        return False

@celery_app.task(name="tasks.send_order_confirmation")
def send_order_confirmation(order_id, recipient_email, order_number, total_amount):
    """
    Asynchronous task to dispatch order confirmation receipt.
    In development, logs the email transaction and payloads.
    """
    logger.info(f"[CELERY EMAIL TASK] Dispatching Order Confirmation #{order_number} to {recipient_email}")
    logger.info(f"Summary: Order ID {order_id}, Total: ${total_amount:.2f}")
    return {
        "status": "dispatched",
        "order_number": order_number,
        "recipient": recipient_email,
        "type": "order_confirmation"
    }

@celery_app.task(name="tasks.send_welcome_email")
def send_welcome_email(user_email, full_name):
    """
    Asynchronous task to dispatch customer welcome packet.
    """
    logger.info(f"[CELERY EMAIL TASK] Sending Welcome Packet to {user_email} ({full_name})")
    return {
        "status": "dispatched",
        "recipient": user_email,
        "type": "welcome_packet"
    }

@celery_app.task(name="tasks.export_orders_csv")
def export_orders_csv(orders_data):
    """
    Asynchronous task to generate and compile store orders into a CSV spreadsheet.
    """
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Order Number", "Date", "Customer Email", "Status", "Total Amount"])
    
    for o in orders_data:
        writer.writerow([
            o.get("order_number"),
            o.get("created_at"),
            o.get("customer_email"),
            o.get("status"),
            o.get("total_amount")
        ])
        
    csv_content = output.getvalue()
    logger.info(f"[CELERY TASK] Exported {len(orders_data)} orders to CSV")
    return {
        "status": "completed",
        "rows_count": len(orders_data),
        "csv_preview": csv_content[:200]
    }

def dispatch_task_safely(task_func, *args, **kwargs):
    """
    Safely triggers a Celery task. If Redis/Celery is unavailable or offline,
    executes the task synchronously in < 1ms without blocking the client.
    """
    if is_redis_available():
        try:
            return task_func.delay(*args, **kwargs)
        except Exception as e:
            logger.warning(f"Celery delay error ({e}); executing fallback.")
            return task_func(*args, **kwargs)
    else:
        # Instant zero-wait fallback when Redis daemon is not running
        return task_func(*args, **kwargs)

