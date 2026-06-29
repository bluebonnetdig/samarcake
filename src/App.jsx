import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CakeSlice,
  Check,
  ChevronDown,
  Coffee,
  Menu,
  Phone,
  Search,
  Sparkles,
  Star,
  Truck,
  X
} from "lucide-react";
import menuData from "./data/samar-cake-menu.json";

const links = {
  instagram: "https://www.instagram.com/samarscake/?hl=en",
  facebook: "https://www.facebook.com/p/Samars-cake-100064361935475/",
  tiktok: "https://www.tiktok.com/@samarcakehtx",
  phone: "tel:+13466669289",
  doordash:
    "https://www.doordash.com/store/samar-cake-katy-40038256/?utm_campaign=gpa&rwg_token=AE37R_j5_4X6H0qw6y-zbYWGSESNe1m10EGpL1p1HQdKb0VkhKoljTW1xbjY06eIQVwNMp2CrZD5BDh7FSPj6hUMR6x2zAi5QA%3D%3D",
  postmates:
    "https://postmates.com/store/samar-cake-south-mason/gCGg_YAYVOq9b4oN060mdA?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_iKt1S0dLmCDCaIbb9lNSnWbMvcdeuf9uu1Nys1nnAAPe6wqRWdhUTaoocwCFzDytGTkJuP2s_JfSa5YoHoI783tg8o1w%3D%3D",
  ubereats:
    "https://www.ubereats.com/store/samar-cake-south-mason/gCGg_YAYVOq9b4oN060mdA?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_hz7ksU2g6iuS-VV2IOMGUUxomkMASg6sZdFLhdUtK3KxZfKDX1BRLN6mHgEEXuqv7GZ1D49ihpMGXI8SBlBEq_NGKnbQ%3D%3D"
};

const gallery = [
  { src: "assets/wedding-cake.jpg", title: "White and gold wedding cake", tall: true },
  { src: "assets/gallery-vanilla.jpg", title: "Signature celebration cake" },
  { src: "assets/gallery-chocolate.jpg", title: "Chocolate dessert cup" },
  { src: "assets/gallery-pink.jpg", title: "Pink custom birthday cake", tall: true },
  { src: "assets/gallery-slice.jpg", title: "Bakery dessert detail" },
  { src: "assets/gallery-cream.jpg", title: "Cream topped cake" },
  { src: "assets/gallery-birthday.jpg", title: "Birthday cake with colorful details" },
  { src: "assets/gallery-custom.jpg", title: "Custom swan cake and kids cakes", tall: true }
];

const deliveryServices = [
  {
    name: "DoorDash",
    href: links.doordash,
    logo: "assets/doordash-logo.png",
    description: "Order delivery or pickup through DoorDash."
  },
  {
    name: "Uber Eats",
    href: links.ubereats,
    logo: "assets/uber-eats-logo.png",
    description: "Order delivery through Uber Eats."
  },
  {
    name: "Postmates",
    href: links.postmates,
    logo: "assets/postmates-logo.png",
    description: "Order delivery through Postmates."
  }
];

const socialServices = [
  { name: "Instagram", href: links.instagram, logo: "assets/instagram-logo.svg" },
  { name: "Facebook", href: links.facebook, logo: "assets/facebook-logo.png" },
  { name: "TikTok", href: links.tiktok, logo: "assets/tiktok-logo.webp" }
];

const features = [
  ["Custom Cakes", "Birthday, wedding, and themed cakes designed around your colors, servings, decorations, and inspiration."],
  ["Desserts & Drinks", "Cake slices, cheesecakes, cookies, baklava, waffle sticks, smoothies, coffee, and matcha drinks."],
  ["Pickup & Delivery", "Order pickup or choose DoorDash, Uber Eats, and Postmates for convenient delivery around Katy."]
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Most Ordered");
  const [query, setQuery] = useState("");
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOrderOpen(false);
        setQuickView(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const flatItems = useMemo(
    () =>
      menuData.categories.flatMap((category) =>
        category.items.map((item) => ({ ...item, category: category.name }))
      ),
    []
  );

  const categoryItems = useMemo(() => {
    const source =
      activeCategory === "All"
        ? flatItems
        : flatItems.filter((item) => item.category === activeCategory);
    const normalized = query.trim().toLowerCase();
    if (!normalized) return source;
    return source.filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized)
    );
  }, [activeCategory, flatItems, query]);

  const goToMenu = () => {
    setActivePage("menu");
    setMobileOpen(false);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const goHome = () => {
    setActivePage("home");
    setMobileOpen(false);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const goToHomeSection = (sectionId) => {
    setActivePage("home");
    setMobileOpen(false);
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 25);
  };

  return (
    <div className="min-h-screen text-cake-ink">
      <Header
        isScrolled={isScrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setOrderOpen={setOrderOpen}
        activePage={activePage}
        goHome={goHome}
        goToMenu={goToMenu}
        goToHomeSection={goToHomeSection}
      />

      <main id="main-content">
        {activePage === "home" ? (
          <HomePage
            setOrderOpen={setOrderOpen}
            goToMenu={goToMenu}
            setQuickView={setQuickView}
          />
        ) : (
          <MenuPage
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            query={query}
            setQuery={setQuery}
            items={categoryItems}
            setQuickView={setQuickView}
          />
        )}
      </main>

      <Footer goToMenu={goToMenu} goHome={goHome} goToHomeSection={goToHomeSection} />

      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
      {quickView && (
        <QuickView
          item={quickView}
          onClose={() => setQuickView(null)}
          setOrderOpen={setOrderOpen}
        />
      )}
    </div>
  );
}

function Header({
  isScrolled,
  mobileOpen,
  setMobileOpen,
  setOrderOpen,
  activePage,
  goHome,
  goToMenu,
  goToHomeSection
}) {
  const navClass = isScrolled
    ? "border-cake-cocoa/10 bg-white/90 shadow-sm backdrop-blur-xl"
    : "border-transparent bg-cake-cream/60 backdrop-blur-md";

  const navItems = [
    ["Home", goHome],
    ["Menu", goToMenu],
    ["Custom Cakes", () => goToHomeSection("about")],
    ["Gallery", () => goToHomeSection("gallery")],
    ["Location", () => goToHomeSection("locations")]
  ];

  return (
    <header className={`sticky top-0 z-40 border-b transition duration-300 ${navClass}`}>
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2" href="#main-content">
        Skip to main content
      </a>
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <button
          type="button"
          onClick={goHome}
          className="focus-ring flex items-center gap-3 rounded-full"
          aria-label="Go to Samar Cake home"
        >
          <img src="assets/logo.png" alt="" className="h-14 w-14 rounded-full object-cover shadow-sm" />
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block font-display text-2xl font-bold leading-5 text-cake-cocoa">Samar Cake</span>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-cake-rose">Katy Bakery</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, action]) => (
            <button
              key={label}
              type="button"
              onClick={action}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-bold transition hover:bg-white hover:text-cake-rose ${
                (label === "Home" && activePage === "home") || (label === "Menu" && activePage === "menu")
                  ? "text-cake-rose"
                  : "text-cake-cocoa"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="focus-ring hidden min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cake-pink to-cake-rose px-6 py-3 text-sm font-extrabold text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0 md:inline-flex" onClick={() => setOrderOpen(true)}>
            Order Now
          </button>
          <button type="button" className="icon-button lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-cake-cocoa/35 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="ml-auto flex min-h-full w-full max-w-sm flex-col bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="assets/logo.png" alt="" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-display text-2xl font-bold text-cake-cocoa">Samar Cake</p>
                  <p className="text-sm font-semibold text-cake-rose">Cake, dessert, coffee, smoothie</p>
                </div>
              </div>
              <button type="button" className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 grid gap-3">
              {navItems.map(([label, action]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    action();
                    setMobileOpen(false);
                  }}
                  className="focus-ring flex min-h-14 items-center justify-between rounded-2xl bg-cake-cream px-5 text-left text-lg font-extrabold text-cake-cocoa"
                >
                  {label}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="mt-auto grid gap-3 pt-8">
              <button type="button" className="pink-button w-full" onClick={() => setOrderOpen(true)}>
                Order Now
              </button>
              <div className="flex gap-3">
                {socialServices.map((service) => (
                  <SocialIcon key={service.name} {...service} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HomePage({ setOrderOpen, goToMenu, setQuickView }) {
  const featured = menuData.categories[0].items.slice(0, 6);

  return (
    <>
      <section className="hero-section relative overflow-hidden bg-[linear-gradient(135deg,#fff8f3_0%,#ffffff_50%,#ffd9cf_100%)] pb-14 pt-10 sm:pb-20 lg:pt-16">
        <div className="hero-shell section-shell grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-extrabold text-cake-rose shadow-sm">
              Premium bakery, custom cakes, coffee, and smoothies in Katy
            </p>
            <h1 className="hero-title font-display text-[clamp(3.1rem,8vw,6.8rem)] font-bold leading-[0.88] text-cake-cocoa">
              Samar Cake
            </h1>
              <p className="hero-copy mt-7 max-w-2xl text-lg leading-8 text-cake-cocoa/80 sm:text-xl">
              Custom birthday cakes, themed celebration cakes, fresh sweets, warm coffee, and vibrant blended drinks made for the moments you want to feel personal.
            </p>
            <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="pink-button" onClick={() => setOrderOpen(true)}>
                Order Now <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button type="button" className="outline-button" onClick={goToMenu}>
                View Menu <CakeSlice size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="hero-socials mt-5 flex flex-col gap-3 rounded-3xl bg-white/80 p-4 shadow-sm backdrop-blur sm:inline-flex sm:flex-row sm:items-center sm:gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cake-rose">Follow Samar Cake</p>
                <p className="mt-1 font-semibold text-cake-cocoa/70">See the latest cakes and desserts.</p>
              </div>
              <div className="flex gap-3">
                {socialServices.map((service) => (
                  <SocialIcon key={service.name} {...service} />
                ))}
              </div>
            </div>
          </div>

          <div className="hero-media relative min-h-[35rem] overflow-hidden rounded-[2rem] bg-cake-mint shadow-soft">
            <img
              src="assets/wedding-cake.jpg"
              alt="Tall custom Samar Cake celebration cake with floral and gold details"
              className="hero-image h-full min-h-[35rem] w-full object-cover"
            />
            <div className="hero-card absolute inset-x-5 bottom-5 rounded-3xl bg-white/85 p-5 shadow-soft backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display text-3xl font-bold text-cake-cocoa">Custom cakes for any occasion</p>
                  <p className="mt-1 text-sm font-semibold text-cake-cocoa/70">Birthdays, themes, florals, gold details, and made-to-order sizing.</p>
                </div>
                <a className="pink-button" href={links.phone}>
                  Call for Custom Cake
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts products={featured} setQuickView={setQuickView} goToMenu={goToMenu} />
      <AboutSection />
      <WhyChooseUs />
      <GallerySection />
      <Reviews />
      <Locations />
    </>
  );
}

function WhyChooseUs() {
  const icons = [CakeSlice, Sparkles, Truck];
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
          <SectionIntro eyebrow="What we make" title="Celebration cakes, daily sweets, and cafe drinks." text="Custom cakes, dessert favorites, coffee, smoothies, and easy delivery for celebrations big and small." />
        <div className="mobile-carousel mt-10 grid gap-5 md:grid-cols-3">
          {features.map(([title, text], index) => {
            const Icon = icons[index];
            return (
              <article key={title} className="mobile-carousel-item rounded-3xl border border-cake-cocoa/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cake-peach text-cake-cocoa">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl font-bold text-cake-cocoa">{title}</h3>
                <p className="mt-3 leading-7 text-cake-cocoa/70">{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ products, setQuickView, goToMenu }) {
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionIntro eyebrow="Featured menu" title="Popular Samar Cake favorites." text="Customer favorites for a quick treat, celebration box, or sweet drink stop." compact />
          <button type="button" className="outline-button self-start lg:self-auto" onClick={goToMenu}>
            View Full Menu <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="mobile-carousel mt-10 grid menu-grid gap-5">
          {products.map((item, index) => (
            <ProductCard
              key={`${item.name}-${index}`}
              item={item}
              setQuickView={setQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item, setQuickView }) {
  const hasMenuImage = Boolean(item.image);

  return (
    <article className={`product-card mobile-carousel-item group overflow-hidden rounded-3xl border border-cake-cocoa/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft ${hasMenuImage ? "" : "no-photo-card"}`}>
      <button type="button" className="product-card-button flex h-full w-full flex-col text-left" onClick={() => setQuickView(item)} aria-label={`Open details for ${item.name}`}>
      {hasMenuImage && (
        <span className="menu-image-frame block overflow-hidden bg-cake-cream">
          <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </span>
      )}
      <span className="p-5">
        <span className="flex items-start justify-between gap-4">
          <span className="product-card-title font-display text-2xl font-bold leading-7 text-cake-cocoa">{item.name}</span>
          <span className="shrink-0 rounded-full bg-cake-peach px-3 py-1 text-sm font-extrabold text-cake-cocoa">{item.price}</span>
        </span>
        <span className="mt-3 flex items-center gap-1 text-cake-gold" aria-label="Customer rating 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
          ))}
        </span>
        <span className="mt-3 min-h-14 text-sm leading-6 text-cake-cocoa/70">
          {item.description || "Freshly prepared Samar Cake favorite available from the current bakery menu."}
        </span>
      </span>
      </button>
    </article>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="about-media overflow-hidden rounded-[2rem] shadow-soft">
          <img src="assets/gallery-custom.jpg" alt="Custom Samar Cake display with swan and kids cakes" loading="lazy" className="about-image h-full min-h-[30rem] w-full object-cover" />
        </div>
        <div>
          <SectionIntro eyebrow="About our bakery" title="A warm Katy bakery for birthdays, weddings, and sweet coffee stops." text="Samar Cake brings together polished celebration cakes, colorful kids cakes, fruit-topped slices, coffee, smoothies, and fresh cookies under one roof." compact />
          <div className="mt-8 grid gap-4">
            {["Consultation for custom cakes", "Fresh menu items available for delivery", "Elegant finishing for milestone events"].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <Check className="mt-1 text-cake-rose" size={20} aria-hidden="true" />
                <p className="font-semibold text-cake-cocoa/80">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-cake-cocoa p-7 text-white">
            <p className="font-display text-3xl font-bold">Made for celebrations</p>
            <p className="mt-3 leading-7 text-white/80">
              Every order should feel personal, from a single cookie to a multi-tier cake. Bring the colors, theme, and celebration, and Samar Cake will shape the dessert around it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-20">
      <div className="section-shell">
        <SectionIntro eyebrow="Gallery" title="Frosting, fruit, florals, and celebration details." text="A look at custom cakes, dessert details, and colorful treats from Samar Cake." />
        <div className="gallery-grid mobile-reel mt-10 columns-1 gap-5 sm:columns-2 lg:columns-4">
          {[...gallery, ...gallery].map((item, index) => (
            <a
              key={`${item.src}-${index}`}
              href={links.instagram}
              target="_blank"
              rel="noreferrer"
              className={`focus-ring group mb-5 block break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-sm ${index >= gallery.length ? "gallery-duplicate" : ""}`}
              aria-label={`Open Samar Cake Instagram for ${item.title}`}
              aria-hidden={index >= gallery.length ? "true" : undefined}
              tabIndex={index >= gallery.length ? -1 : undefined}
            >
              <img src={item.src} alt={item.title} loading="lazy" className={`gallery-image w-full object-cover transition duration-500 group-hover:scale-105 ${item.tall ? "h-[28rem]" : "h-72"}`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    ["The cakes tasted incredibly fresh and light, not overly sweet, just perfectly balanced.", "D."],
    ["Samar Cake is a great place to get delicious and beautiful cakes. The quality is excellent.", "R. A."],
    ["Discovered them on TikTok for the Dubai desserts. By far the best I have tried so far.", "J. S."]
  ];
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
        <SectionIntro eyebrow="Reviews" title="Loved for balanced sweetness and beautiful cakes." text="A few short notes from customer reviews." />
        <div className="mobile-carousel mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map(([quote, name]) => (
            <article key={name} className="mobile-carousel-item rounded-3xl border border-cake-cocoa/10 bg-cake-cream p-7">
              <div className="flex gap-1 text-cake-gold" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 text-lg font-semibold leading-8 text-cake-cocoa">{quote}</p>
              <p className="mt-6 font-extrabold text-cake-rose">{name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" className="location-section py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionIntro eyebrow="Store location" title="Visit Samar Cake in Katy." text="A warm bakery stop for custom cake consultation, coffee, smoothies, cookies, cheesecakes, and pickup orders." compact />
          <div className="mt-8 grid gap-4">
            <HoursDropdown />
            <a className="pink-button w-fit" href={links.phone} aria-label="Call Samar Cake at 346-666-9289">
              <Phone size={18} aria-hidden="true" />
              Call (346) 666-9289
            </a>
          </div>
        </div>
        <div className="location-map min-h-[24rem] overflow-hidden rounded-[2rem] bg-cake-cocoa shadow-soft">
          <iframe
            title="Map showing Katy, Texas area for Samar Cake"
            src="https://www.google.com/maps?q=Samar%20Cake%20Katy%20TX&output=embed"
            className="h-full min-h-[24rem] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function MenuPage({ activeCategory, setActiveCategory, query, setQuery, items, setQuickView }) {
  const sections = menuData.categories
    .map((category) => ({
      name: category.name,
      items: items.filter((item) => item.category === category.name)
    }))
    .filter((section) => section.items.length > 0);

  return (
    <section className="menu-page pb-20 pt-6">
      <div className="section-shell">
        <div className="menu-hero rounded-3xl p-4 sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cake-rose">Bakery menu</p>
          <h1 className="mt-2 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-none text-cake-cocoa">Cakes, sweets, and drinks</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-cake-cocoa/70 sm:text-base">
            Browse cakes, cookies, beverages, coffee, and most ordered favorites from Samar Cake.
          </p>
          <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Search menu items</span>
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-cake-cocoa/45" size={20} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="focus-ring min-h-14 w-full rounded-full border border-cake-cocoa/10 bg-white pl-14 pr-5 font-semibold text-cake-cocoa shadow-sm"
                placeholder="Search cake, coffee, pistachio, strawberry..."
              />
            </label>
          </div>
        </div>

        <div className="sticky top-20 z-20 -mx-5 mt-4 overflow-x-auto bg-white/90 px-5 py-3 backdrop-blur sm:-mx-10 sm:px-10 xl:-mx-20 xl:px-20">
          <div className="flex min-w-max gap-3" role="tablist" aria-label="Menu categories">
            {["All", ...menuData.categories.map((category) => category.name)].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`focus-ring min-h-11 rounded-full px-5 text-sm font-extrabold transition ${
                  activeCategory === category ? "bg-cake-cocoa text-white" : "bg-cake-cream text-cake-cocoa hover:bg-cake-peach"
                }`}
                aria-selected={activeCategory === category}
                role="tab"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-10">
          <p className="sr-only" aria-live="polite">{items.length} menu items visible</p>
          {sections.length > 0 ? (
            sections.map((section) => (
              <section key={section.name} className="menu-category-section">
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-cake-cocoa/10 pb-3">
                  <h2 className="font-display text-4xl font-bold leading-none text-cake-cocoa">{section.name}</h2>
                  <span className="h-3 w-16 rounded-full bg-cake-peach" aria-hidden="true" />
                </div>
                <div className="grid menu-grid menu-section-grid gap-5">
                  {section.items.map((item, index) => (
                    <ProductCard
                      key={`${item.category}-${item.name}-${index}`}
                      item={item}
                      setQuickView={setQuickView}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <p className="font-display text-3xl font-bold text-cake-cocoa">No menu items found.</p>
              <p className="mt-2 text-cake-cocoa/70">Try a different search term or choose another category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ goToMenu, goHome, goToHomeSection }) {
  return (
    <footer className="bg-cake-cocoa py-12 text-white">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="assets/logo.png" alt="" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="font-display text-3xl font-bold">Samar Cake</p>
              <p className="font-semibold text-white/60">Cake, dessert, coffee, smoothie</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-white/70">Custom cakes, fresh desserts, coffee, and smoothies.</p>
        </div>
        <FooterList title="Quick links" items={[["Home", goHome], ["Menu", goToMenu], ["Custom Cakes", () => goToHomeSection("about")], ["Gallery", () => goToHomeSection("gallery")]]} />
        <div>
          <p className="font-extrabold text-cake-gold">Social</p>
          <div className="mt-4 flex gap-3">
            {socialServices.map((service) => (
              <SocialIcon key={service.name} {...service} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-extrabold text-cake-gold">Order</p>
          <div className="mt-4 grid gap-3">
            <a className="focus-ring rounded-full bg-white/10 px-4 py-3 font-bold text-white hover:bg-white/18" href={links.doordash} target="_blank" rel="noreferrer">DoorDash</a>
            <a className="focus-ring rounded-full bg-white/10 px-4 py-3 font-bold text-white hover:bg-white/18" href={links.ubereats} target="_blank" rel="noreferrer">Uber Eats</a>
            <a className="focus-ring rounded-full bg-white/10 px-4 py-3 font-bold text-white hover:bg-white/18" href={links.postmates} target="_blank" rel="noreferrer">Postmates</a>
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-white/12 pt-6 text-sm font-semibold text-white/55">
        Copyright 2026 Samar Cake. All rights reserved.
      </div>
    </footer>
  );
}

function FooterList({ title, items }) {
  return (
    <div>
      <p className="font-extrabold text-cake-gold">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map(([label, action]) => (
          <button key={label} type="button" className="focus-ring text-left font-bold text-white/75 hover:text-white" onClick={action}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function OrderModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cake-cocoa/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="order-title">
      <div className="max-h-[92vh] w-full max-w-xl overflow-auto rounded-[2rem] bg-white p-5 shadow-soft sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cake-rose">Order now</p>
            <h2 id="order-title" className="mt-2 font-display text-5xl font-bold text-cake-cocoa">Choose delivery.</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close order options">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-8 grid gap-3">
          {deliveryServices.map((service) => (
            <a
              key={service.name}
              className="focus-ring group flex min-h-20 items-center gap-4 rounded-3xl border border-cake-cocoa/10 bg-cake-cream p-4 text-cake-cocoa transition hover:-translate-y-0.5 hover:border-cake-pink/40 hover:bg-white hover:shadow-soft"
              href={service.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm">
                <img src={service.logo} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-3xl font-bold leading-8">{service.name}</span>
                <span className="mt-1 block text-sm font-semibold text-cake-cocoa/65">{service.description}</span>
              </span>
              <ArrowRight className="shrink-0 text-cake-rose transition group-hover:translate-x-1" size={20} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickView({ item, onClose, setOrderOpen }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cake-cocoa/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="quick-title">
      <div className={`grid max-h-[92vh] w-full overflow-auto rounded-[2rem] bg-white shadow-soft ${item.image ? "max-w-5xl lg:grid-cols-2" : "max-w-xl"}`}>
        {item.image && (
          <img src={item.image} alt={item.name} className="h-80 w-full object-cover lg:h-full" />
        )}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cake-rose">{item.category || "Samar Cake"}</p>
              <h2 id="quick-title" className="mt-2 font-display text-5xl font-bold leading-none text-cake-cocoa">{item.name}</h2>
            </div>
            <button type="button" className="icon-button" onClick={onClose} aria-label="Close product detail">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <p className="mt-5 inline-flex rounded-full bg-cake-peach px-4 py-2 font-extrabold text-cake-cocoa">{item.price}</p>
          <p className="mt-5 leading-8 text-cake-cocoa/70">{item.description || "Freshly prepared Samar Cake menu item. Ask about customization and current availability."}</p>
          <button
            type="button"
            className="pink-button mt-7 w-full"
            onClick={() => {
              onClose();
              setOrderOpen(true);
            }}
          >
            Choose Delivery
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, text, compact = false }) {
  return (
    <div className={compact ? "max-w-3xl" : "mx-auto max-w-4xl text-center"}>
      <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cake-rose">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2.7rem,6vw,4.8rem)] font-bold leading-none text-cake-cocoa">{title}</h2>
      <p className={`mt-5 text-lg leading-8 text-cake-cocoa/70 ${compact ? "" : "mx-auto max-w-3xl"}`}>{text}</p>
    </div>
  );
}

function HoursDropdown() {
  const hours = [
    ["Monday", "Closed"],
    ["Tuesday", "11 AM-8 PM"],
    ["Wednesday", "11 AM-8 PM"],
    ["Thursday", "11 AM-8 PM"],
    ["Friday", "11 AM-9 PM"],
    ["Saturday", "11 AM-9 PM"],
    ["Sunday", "11 AM-5 PM"]
  ];

  return (
    <details className="location-hours group rounded-3xl bg-white shadow-sm">
      <summary className="focus-ring flex cursor-pointer list-none gap-4 rounded-3xl p-5 [&::-webkit-details-marker]:hidden">
        <span className="location-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cake-peach text-cake-cocoa">
          <Coffee size={21} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-extrabold text-cake-cocoa">Hours</span>
          <span className="mt-1 block leading-6 text-cake-cocoa/70">Tap to view weekly bakery hours</span>
        </span>
        <ChevronDown className="mt-3 shrink-0 text-cake-rose transition group-open:rotate-180" size={22} aria-hidden="true" />
      </summary>
      <div className="px-5 pb-5">
        <div className="ml-16 grid gap-2 border-t border-cake-cocoa/10 pt-4">
          {hours.map(([day, time]) => (
            <div key={day} className="flex items-center justify-between gap-4 rounded-2xl bg-cake-cream px-4 py-3">
              <span className="font-extrabold text-cake-cocoa">{day}</span>
              <span className="text-right font-semibold text-cake-cocoa/70">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

function SocialIcon({ href, name, label, logo, icon, text }) {
  const accessibleName = label || name;
  return (
    <a className="icon-button social-icon overflow-hidden bg-white/95 p-0 text-cake-cocoa" href={href} target="_blank" rel="noreferrer" aria-label={`Open Samar Cake ${accessibleName}`}>
      {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : icon || <span className="text-sm font-extrabold" aria-hidden="true">{text}</span>}
    </a>
  );
}

export default App;
