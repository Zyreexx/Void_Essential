import logging
from backend.app.models import db
from backend.app.models.models import Category, Product, ProductVariant, ProductImage, User

logger = logging.getLogger(__name__)

def seed_database():
    """Seeds the database with categories, initial admin user, and Void Essentials product catalog."""
    
    # 1. Seed Categories if empty
    if Category.query.count() == 0:
        logger.info("Seeding categories...")
        categories_data = [
            {
                "name": "Men",
                "slug": "men",
                "tagline": "Elevated everyday essentials.",
                "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
                "display_order": 1
            },
            {
                "name": "Women",
                "slug": "women",
                "tagline": "Effortless style for every you.",
                "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
                "display_order": 2
            },
            {
                "name": "Accessories",
                "slug": "accessories",
                "tagline": "Comfort meets cool everyday.",
                "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
                "display_order": 3
            }
        ]
        for c in categories_data:
            cat = Category(**c)
            db.session.add(cat)
        db.session.commit()
        
    men_cat = Category.query.filter_by(slug="men").first()
    women_cat = Category.query.filter_by(slug="women").first()
    acc_cat = Category.query.filter_by(slug="accessories").first()
    
    # 2. Seed Initial Admin User if empty
    if User.query.filter_by(email="admin@voidessentials.store").first() is None:
        admin = User(
            email="admin@voidessentials.store",
            full_name="Void Atelier Director",
            role="admin"
        )
        admin.set_password("VoidSecure2026!")
        db.session.add(admin)
        db.session.commit()
        logger.info("Admin user seeded: admin@voidessentials.store")

    # 3. Seed Products if empty
    if Product.query.count() == 0:
        logger.info("Seeding Void Essentials catalog...")
        
        products_data = [
            {
                "title": "Shirt Jacket",
                "slug": "shirt-jacket",
                "category_id": men_cat.id,
                "price": 6499.00,
                "compare_at_price": 7200.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Architectural shirt jacket in relaxed structured silhouette with contrast inner cuff detail, drop shoulders, and minimalist front button closure.",
                "fabric_composition": "100% Heavyweight Structured Cotton Twill.",
                "care_instructions": "Dry clean or gentle hand wash cold. Dry in shade.",
                "images": [
                    {"url": "/images/products/shirt-jacket.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "S", "color": "Sand Stone", "hex": "#C4BFB6", "sku": "VOID-SJK-SND-S", "stock": 10},
                    {"size": "M", "color": "Sand Stone", "hex": "#C4BFB6", "sku": "VOID-SJK-SND-M", "stock": 16},
                    {"size": "L", "color": "Sand Stone", "hex": "#C4BFB6", "sku": "VOID-SJK-SND-L", "stock": 12}
                ]
            },
            {
                "title": "Oversized Hoodie",
                "slug": "oversized-hoodie",
                "category_id": men_cat.id,
                "price": 12699.00,
                "compare_at_price": 14000.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Ultra-heavyweight 480 GSM drop-shoulder fleece hoodie with high-density ribbed collar, concealed zip, and structured boxy drape.",
                "fabric_composition": "100% Combed Organic Supima French Terry (480 GSM).",
                "care_instructions": "Machine wash cold inside out. Reshape and lay flat to dry.",
                "images": [
                    {"url": "/images/products/oversized-hoodie.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "S", "color": "Deep Umber", "hex": "#3E3633", "sku": "VOID-HOD-UMB-S", "stock": 14},
                    {"size": "M", "color": "Deep Umber", "hex": "#3E3633", "sku": "VOID-HOD-UMB-M", "stock": 20},
                    {"size": "L", "color": "Deep Umber", "hex": "#3E3633", "sku": "VOID-HOD-UMB-L", "stock": 15}
                ]
            },
            {
                "title": "Puffer Jacket",
                "slug": "puffer-jacket",
                "category_id": men_cat.id,
                "price": 16999.00,
                "compare_at_price": 18900.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Insulated architectural puffer jacket featuring contrast corduroy rib collar, heavy metal zip closure, and weather-resistant matte exterior.",
                "fabric_composition": "100% Recycled Water-Repellent Ripstop with Thermal Insulation.",
                "care_instructions": "Professional specialty clean only. Do not iron.",
                "images": [
                    {"url": "/images/products/puffer-jacket.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "S", "color": "Sage Olive", "hex": "#B6BAA8", "sku": "VOID-PUF-OLV-S", "stock": 8},
                    {"size": "M", "color": "Sage Olive", "hex": "#B6BAA8", "sku": "VOID-PUF-OLV-M", "stock": 12},
                    {"size": "L", "color": "Sage Olive", "hex": "#B6BAA8", "sku": "VOID-PUF-OLV-L", "stock": 6}
                ]
            },
            {
                "title": "Corduroy Jacket",
                "slug": "corduroy-jacket",
                "category_id": men_cat.id,
                "price": 13899.00,
                "compare_at_price": 15400.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Heavy 8-wale structured cotton corduroy jacket with front zip, lined interior, and clean welt pockets for architectural everyday layering.",
                "fabric_composition": "100% Cotton 8-Wale Heavy Corduroy.",
                "care_instructions": "Dry clean only. Brush corduroy pile gently with soft brush.",
                "images": [
                    {"url": "/images/products/corduroy-jacket.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "S", "color": "Dark Mocha", "hex": "#382C26", "sku": "VOID-CRD-MCH-S", "stock": 10},
                    {"size": "M", "color": "Dark Mocha", "hex": "#382C26", "sku": "VOID-CRD-MCH-M", "stock": 15},
                    {"size": "L", "color": "Dark Mocha", "hex": "#382C26", "sku": "VOID-CRD-MCH-L", "stock": 8}
                ]
            },
            {
                "title": "Flannel Shirt",
                "slug": "flannel-shirt",
                "category_id": men_cat.id,
                "price": 10580.00,
                "compare_at_price": 11800.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Brushed double-weave ombre plaid flannel overshirt cut with relaxed drop shoulders, curved split hem, and premium horn buttons.",
                "fabric_composition": "100% Brushed Double-Ply Yarn-Dyed Cotton (340 GSM).",
                "care_instructions": "Machine wash cold delicate. Hang to dry in shade.",
                "images": [
                    {"url": "/images/products/flannel-shirt.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "S", "color": "Charcoal Plaid", "hex": "#4A4D4F", "sku": "VOID-FLN-PLD-S", "stock": 12},
                    {"size": "M", "color": "Charcoal Plaid", "hex": "#4A4D4F", "sku": "VOID-FLN-PLD-M", "stock": 18},
                    {"size": "L", "color": "Charcoal Plaid", "hex": "#4A4D4F", "sku": "VOID-FLN-PLD-L", "stock": 14}
                ]
            },
            {
                "title": "Cargo Pant",
                "slug": "cargo-pant",
                "category_id": men_cat.id,
                "price": 9270.00,
                "compare_at_price": 10300.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Wide-leg sculptural cargo trousers with articulated knee darts, deep bellows cargo pockets, and elasticated hem drawstrings.",
                "fabric_composition": "100% High-Density Cotton Canvas (380 GSM).",
                "care_instructions": "Machine wash cold inside out with similar colors. Line dry.",
                "images": [
                    {"url": "/images/products/cargo-pant.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "30", "color": "Earth Ochre", "hex": "#A97C47", "sku": "VOID-CRG-OCH-30", "stock": 10},
                    {"size": "32", "color": "Earth Ochre", "hex": "#A97C47", "sku": "VOID-CRG-OCH-32", "stock": 15},
                    {"size": "34", "color": "Earth Ochre", "hex": "#A97C47", "sku": "VOID-CRG-OCH-34", "stock": 10}
                ]
            },
            {
                "title": "Wide Leg Pant",
                "slug": "wide-leg-pant",
                "category_id": men_cat.id,
                "price": 7900.00,
                "compare_at_price": 8800.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Relaxed fluid wide-leg trouser cut from mineral-washed black cotton with subtle drape pooling cleanly over shoes.",
                "fabric_composition": "100% Mineral-Washed Heavyweight Cotton.",
                "care_instructions": "Wash cold inside out. Air dry.",
                "images": [
                    {"url": "/images/products/wide-leg-pant.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "30", "color": "Washed Slate", "hex": "#2B2E33", "sku": "VOID-WLD-SLT-30", "stock": 14},
                    {"size": "32", "color": "Washed Slate", "hex": "#2B2E33", "sku": "VOID-WLD-SLT-32", "stock": 18},
                    {"size": "34", "color": "Washed Slate", "hex": "#2B2E33", "sku": "VOID-WLD-SLT-34", "stock": 12}
                ]
            },
            {
                "title": "Varsity Jacket",
                "slug": "varsity-jacket",
                "category_id": men_cat.id,
                "price": 15400.00,
                "compare_at_price": 17200.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Minimalist tonal varsity jacket in rich chocolate brown wool with contrast turn-down collar, snap front, and cupro satin lining.",
                "fabric_composition": "80% Virgin Melton Wool, 20% Cashmere. Lining: 100% Cupro.",
                "care_instructions": "Specialist dry clean only.",
                "images": [
                    {"url": "/images/products/varsity-jacket.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "S", "color": "Rich Umber", "hex": "#5A3828", "sku": "VOID-VAR-UMB-S", "stock": 8},
                    {"size": "M", "color": "Rich Umber", "hex": "#5A3828", "sku": "VOID-VAR-UMB-M", "stock": 12},
                    {"size": "L", "color": "Rich Umber", "hex": "#5A3828", "sku": "VOID-VAR-UMB-L", "stock": 6}
                ]
            },
            {
                "title": "VINTAGE BOOTCUT DENIM (SUN-FADED BLUE)",
                "slug": "vintage-bootcut-denim-sun-faded-blue",
                "category_id": men_cat.id,
                "price": 1349.10,
                "compare_at_price": 1499.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Premium heavyweight cotton denim crafted with vintage artisanal fading techniques. Cut with a relaxed knee and subtle bootcut flare designed to drape naturally over boots and sneakers.",
                "fabric_composition": "100% Ring-Spun Heavyweight Cotton Denim (14.5 oz).",
                "care_instructions": "Machine wash cold inside out with similar colors. Line dry.",
                "images": [
                    {"url": "/images/products/denim-1.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "30", "color": "Sun-Faded Blue", "hex": "#768B9E", "sku": "VOID-DNM-BLU-30", "stock": 10},
                    {"size": "32", "color": "Sun-Faded Blue", "hex": "#768B9E", "sku": "VOID-DNM-BLU-32", "stock": 15},
                    {"size": "34", "color": "Sun-Faded Blue", "hex": "#768B9E", "sku": "VOID-DNM-BLU-34", "stock": 12}
                ]
            },
            {
                "title": "VINTAGE BOOTCUT DENIM (BLACK RINSE)",
                "slug": "vintage-bootcut-denim-black-rinse",
                "category_id": men_cat.id,
                "price": 1349.10,
                "compare_at_price": 1499.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Mineral washed pitch-black denim with subtle thigh whiskers and distress detailing. Features reinforced copper hardware and archival coin pocket stitching.",
                "fabric_composition": "100% Selvedge Indigo/Sulphur Black Cotton (14 oz).",
                "care_instructions": "Wash cold inside out. Do not bleach. Air dry.",
                "images": [
                    {"url": "/images/products/denim-2.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "30", "color": "Black Rinse", "hex": "#1E1E1E", "sku": "VOID-DNM-BLK-30", "stock": 12},
                    {"size": "32", "color": "Black Rinse", "hex": "#1E1E1E", "sku": "VOID-DNM-BLK-32", "stock": 20},
                    {"size": "34", "color": "Black Rinse", "hex": "#1E1E1E", "sku": "VOID-DNM-BLK-34", "stock": 10}
                ]
            },
            {
                "title": "BAGGY FIT DENIM (BLACK RINSE)",
                "slug": "baggy-fit-denim-black-rinse",
                "category_id": men_cat.id,
                "price": 1349.10,
                "compare_at_price": 1499.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Exaggerated architectural wide-leg baggy silhouette engineered for relaxed movement and voluminous pooling at the hem. Custom sulphur dyed for a vintage matte finish.",
                "fabric_composition": "100% Heavy Combed Cotton (14 oz).",
                "care_instructions": "Hand or machine wash cold gentle. Hang in shade.",
                "images": [
                    {"url": "/images/products/denim-3.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "30", "color": "Black Rinse", "hex": "#222222", "sku": "VOID-BGY-BLK-30", "stock": 14},
                    {"size": "32", "color": "Black Rinse", "hex": "#222222", "sku": "VOID-BGY-BLK-32", "stock": 18},
                    {"size": "34", "color": "Black Rinse", "hex": "#222222", "sku": "VOID-BGY-BLK-34", "stock": 8}
                ]
            },
            {
                "title": "BAGGY FIT DENIM (DARK BLUE)",
                "slug": "baggy-fit-denim-dark-blue",
                "category_id": men_cat.id,
                "price": 1349.10,
                "compare_at_price": 1499.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Deep indigo dark wash denim cut in our signature relaxed baggy fit. Softened through vintage enzyme washing to achieve an authentically lived-in handfeel.",
                "fabric_composition": "100% Organic Raw Indigo Cotton (14.5 oz).",
                "care_instructions": "Wash cold inside out. Dry flat.",
                "images": [
                    {"url": "/images/products/denim-4.jpg", "primary": True}
                ],
                "variants": [
                    {"size": "30", "color": "Dark Blue", "hex": "#2A3644", "sku": "VOID-BGY-BLU-30", "stock": 15},
                    {"size": "32", "color": "Dark Blue", "hex": "#2A3644", "sku": "VOID-BGY-BLU-32", "stock": 16},
                    {"size": "34", "color": "Dark Blue", "hex": "#2A3644", "sku": "VOID-BGY-BLU-34", "stock": 11}
                ]
            },
            {
                "title": "Archival Monolith Trench Coat",
                "slug": "archival-monolith-trench-coat",
                "category_id": men_cat.id,
                "price": 380.00,
                "compare_at_price": 450.00,
                "is_featured": True,
                "is_archival": True,
                "is_new_arrival": True,
                "description": "Constructed from custom-developed 420 GSM water-repellent Japanese gabardine cotton. Features an architectural storm flap, relaxed drop shoulders, raw horn buttons, and deep welt pockets. Designed for unrestricted movement with an oversized silhouette that drapes effortlessly over tailored knitwear.",
                "fabric_composition": "100% Japanese Gabardine Cotton (420 GSM). Lining: 100% Cupro.",
                "care_instructions": "Specialist dry clean only. Steam gently. Do not tumble dry.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop", "primary": True},
                    {"url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop", "primary": False}
                ],
                "variants": [
                    {"size": "S", "color": "Washed Pitch", "hex": "#111111", "sku": "VOID-TRN-BLK-S", "stock": 8},
                    {"size": "M", "color": "Washed Pitch", "hex": "#111111", "sku": "VOID-TRN-BLK-M", "stock": 14},
                    {"size": "L", "color": "Washed Pitch", "hex": "#111111", "sku": "VOID-TRN-BLK-L", "stock": 10},
                    {"size": "M", "color": "Archival Bone", "hex": "#E8E7E3", "sku": "VOID-TRN-BNE-M", "stock": 6}
                ]
            },
            {
                "title": "Heavyweight Raw Edge Boxy Tee",
                "slug": "heavyweight-raw-edge-boxy-tee",
                "category_id": men_cat.id,
                "price": 85.00,
                "compare_at_price": 100.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "The quintessential daily uniform. Milled from combed 320 GSM organic ring-spun cotton. Cut with a relaxed boxy drape, structured ribbed collar, and blind-stitched hems for a crisp, timeless profile that maintains its posture wash after wash.",
                "fabric_composition": "100% Organic Combed Ring-Spun Cotton (320 GSM).",
                "care_instructions": "Machine wash cold inside out with similar darks. Hang dry in shade.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop", "primary": True},
                    {"url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop", "primary": False}
                ],
                "variants": [
                    {"size": "S", "color": "Pitch Black", "hex": "#0A0A0A", "sku": "VOID-TEE-BLK-S", "stock": 25},
                    {"size": "M", "color": "Pitch Black", "hex": "#0A0A0A", "sku": "VOID-TEE-BLK-M", "stock": 30},
                    {"size": "L", "color": "Pitch Black", "hex": "#0A0A0A", "sku": "VOID-TEE-BLK-L", "stock": 20},
                    {"size": "XL", "color": "Pitch Black", "hex": "#0A0A0A", "sku": "VOID-TEE-BLK-XL", "stock": 12},
                    {"size": "M", "color": "Chalk White", "hex": "#FDFCFA", "sku": "VOID-TEE-WHT-M", "stock": 18}
                ]
            },
            {
                "title": "Sculptural Tailored Wool Trouser",
                "slug": "sculptural-tailored-wool-trouser",
                "category_id": men_cat.id,
                "price": 240.00,
                "compare_at_price": None,
                "is_featured": True,
                "is_archival": True,
                "is_new_arrival": False,
                "description": "Engineered with subtle forward pleats and an architectural wide-leg drape. Spun from breathable Italian tropical wool that transitions seamlessly across seasons. Features an interior curtain waistband and reinforced horn closures.",
                "fabric_composition": "100% Virgin Tropical Wool. Pocketing: 100% Cotton twill.",
                "care_instructions": "Dry clean only. Press with medium iron using a pressing cloth.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop", "primary": True},
                    {"url": "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop", "primary": False}
                ],
                "variants": [
                    {"size": "30", "color": "Slate Charcoal", "hex": "#2B2B2B", "sku": "VOID-TRS-CHR-30", "stock": 9},
                    {"size": "32", "color": "Slate Charcoal", "hex": "#2B2B2B", "sku": "VOID-TRS-CHR-32", "stock": 15},
                    {"size": "34", "color": "Slate Charcoal", "hex": "#2B2B2B", "sku": "VOID-TRS-CHR-34", "stock": 8}
                ]
            },
            {
                "title": "Minimalist Cashmere Cocoon Knit",
                "slug": "minimalist-cashmere-cocoon-knit",
                "category_id": women_cat.id,
                "price": 290.00,
                "compare_at_price": 340.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Knit from ultra-soft 7-gauge Mongolian cashmere. Featuring an understated funnel neck, elongated ribbed cuffs, and a gently rounded cocoon silhouette. Designed to offer weightless warmth and refined daily luxury.",
                "fabric_composition": "100% Grade-A Mongolian Cashmere.",
                "care_instructions": "Hand wash cold using delicate wool wash or dry clean. Lay flat to dry.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop", "primary": True},
                    {"url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop", "primary": False}
                ],
                "variants": [
                    {"size": "XS", "color": "Oatmeal Bone", "hex": "#E3DFD7", "sku": "VOID-CSH-OAT-XS", "stock": 6},
                    {"size": "S", "color": "Oatmeal Bone", "hex": "#E3DFD7", "sku": "VOID-CSH-OAT-S", "stock": 12},
                    {"size": "M", "color": "Oatmeal Bone", "hex": "#E3DFD7", "sku": "VOID-CSH-OAT-M", "stock": 10},
                    {"size": "S", "color": "Pitch Black", "hex": "#0A0A0A", "sku": "VOID-CSH-BLK-S", "stock": 8}
                ]
            },
            {
                "title": "Oversized Tailored Atelier Blazer",
                "slug": "oversized-tailored-atelier-blazer",
                "category_id": women_cat.id,
                "price": 360.00,
                "compare_at_price": 420.00,
                "is_featured": True,
                "is_archival": True,
                "is_new_arrival": True,
                "description": "A study in precision tailoring. Cut with structured padded shoulders, peak lapels, and a lengthened silhouette. Crafted from a structured wool-blend twill with cupro jacquard lining.",
                "fabric_composition": "70% Virgin Wool, 30% Mulberry Silk.",
                "care_instructions": "Professional dry clean only.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop", "primary": True},
                    {"url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop", "primary": False}
                ],
                "variants": [
                    {"size": "S", "color": "Midnight Pitch", "hex": "#0D0D11", "sku": "VOID-BLZ-BLK-S", "stock": 7},
                    {"size": "M", "color": "Midnight Pitch", "hex": "#0D0D11", "sku": "VOID-BLZ-BLK-M", "stock": 11},
                    {"size": "L", "color": "Midnight Pitch", "hex": "#0D0D11", "sku": "VOID-BLZ-BLK-L", "stock": 5}
                ]
            },
            {
                "title": "Architectural Leather Weekend Tote",
                "slug": "architectural-leather-weekend-tote",
                "category_id": acc_cat.id,
                "price": 320.00,
                "compare_at_price": None,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Constructed from vegetable-tanned full-grain Italian leather with hand-painted beveled edges. Designed with reinforced bridle leather handles, an interior magnetic laptop sleeve, and brushed palladium hardware.",
                "fabric_composition": "100% Full-Grain Vegetable-Tanned Italian Vachetta Leather.",
                "care_instructions": "Treat with natural beeswax balm. Store in archival dust bag.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop", "primary": True},
                    {"url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop", "primary": False}
                ],
                "variants": [
                    {"size": "OS", "color": "Matte Obsidian", "hex": "#121212", "sku": "VOID-TOT-OBS-OS", "stock": 14}
                ]
            },
            {
                "title": "Void Signature Minimalist Buckle Belt",
                "slug": "void-signature-minimalist-buckle-belt",
                "category_id": acc_cat.id,
                "price": 110.00,
                "compare_at_price": 130.00,
                "is_featured": False,
                "is_archival": True,
                "is_new_arrival": False,
                "description": "Solid brass hardware with a brushed satin nickel finish set into 3.5mm thick bridle leather. Features debossed Void Essentials atelier hallmark on the interior tongue.",
                "fabric_composition": "100% Vegetable-Tanned Bridle Leather, Solid Brass Hardware.",
                "care_instructions": "Wipe clean with a soft dry cloth.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop", "primary": True}
                ],
                "variants": [
                    {"size": "85", "color": "Pitch Black", "hex": "#0A0A0A", "sku": "VOID-BLT-85", "stock": 10},
                    {"size": "95", "color": "Pitch Black", "hex": "#0A0A0A", "sku": "VOID-BLT-95", "stock": 10}
                ]
            },
            {
                "title": "Structured Heavyweight Hoodie",
                "slug": "structured-heavyweight-hoodie",
                "category_id": men_cat.id,
                "price": 165.00,
                "compare_at_price": 195.00,
                "is_featured": True,
                "is_archival": False,
                "is_new_arrival": True,
                "description": "Knitted from double-faced 500 GSM French Terry cotton. Built without external drawstrings for a pure, seamless aesthetic. Features a double-layered crossover hood and concealed side-seam pockets.",
                "fabric_composition": "100% Heavyweight French Terry Cotton (500 GSM).",
                "care_instructions": "Machine wash cold inside out. Flat dry.",
                "images": [
                    {"url": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop", "primary": True},
                    {"url": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop", "primary": False}
                ],
                "variants": [
                    {"size": "S", "color": "Washed Slate", "hex": "#383B3E", "sku": "VOID-HOD-SLT-S", "stock": 12},
                    {"size": "M", "color": "Washed Slate", "hex": "#383B3E", "sku": "VOID-HOD-SLT-M", "stock": 18},
                    {"size": "L", "color": "Washed Slate", "hex": "#383B3E", "sku": "VOID-HOD-SLT-L", "stock": 15}
                ]
            }
        ]
        
        for p_data in products_data:
            images = p_data.pop("images")
            variants = p_data.pop("variants")
            
            product = Product(**p_data)
            db.session.add(product)
            db.session.flush()
            
            for idx, img in enumerate(images):
                p_img = ProductImage(
                    product_id=product.id,
                    image_url=img["url"],
                    alt_text=f"{product.title} editorial view",
                    is_primary=img.get("primary", idx == 0),
                    display_order=idx
                )
                db.session.add(p_img)
                
            for var in variants:
                p_var = ProductVariant(
                    product_id=product.id,
                    size=var["size"],
                    color_name=var["color"],
                    color_hex=var.get("hex", "#0A0A0A"),
                    sku=var["sku"],
                    stock_quantity=var.get("stock", 10),
                    price_override=var.get("price_override")
                )
                db.session.add(p_var)
                
        db.session.commit()
        logger.info(f"Seeded {len(products_data)} products successfully.")
