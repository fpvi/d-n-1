<?php
var_dump($products)



  ?>

<body>
  <!-- Header / Navbar -->


  <!-- Hero / Slider -->
  <section class="hero">
    <div class="container hero-inner">
      <!-- big image placeholder (replace with hero image) -->

      <img class="hero-image placeholder-hero" src="Views/assets/img/mainbanner1.png" alt="">


      <!-- left/right arrows replaced by simple divs -->
      <div class="hero-arrow left-arrow placeholder-arrow" aria-hidden="true"></div>
      <div class="hero-arrow right-arrow placeholder-arrow" aria-hidden="true"></div>
    </div>

    <!-- dots -->
    <div class="container hero-dots">
      <div class="dot active"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </section>

  <!-- Brand logos row -->
  <!-- <section class="brand-row">
    <div class="container brand-inner">
      <div class="brand placeholder-brand" title="brand logo"></div>
      <div class="brand placeholder-brand"></div>
      <div class="brand placeholder-brand"></div>
      <div class="brand placeholder-brand"></div>
      <div class="brand placeholder-brand"></div>
      <div class="brand placeholder-brand"></div>
      <div class="brand placeholder-brand"></div>
    </div>
  </section> -->

  <!-- Banner small -->
  <section class="promo container">
    <img class="promo-card placeholder-promo" src="Views/assets/img/banner1.png" alt="">
  </section>

  <!-- Top Best Sellers -->
  <section class="section container">
    <div class="section-head">
      <h2>TOP BEST SELLERS</h2>
      <div class="section-arrow placeholder-arrow-sm"></div>
    </div>

    <div class="product-grid" id="product-list">


      <!-- <article class="product-card">
        <img class="product-image placeholder-thumb" src="Views/assets/img/sp2.png" alt="">
        <h3 class="product-name">The Mirror</h3>
        <div class="product-meta">42mm • Silver Platinum</div>
        <div class="product-price">5.100.000</div>
        <div class="actions">
        <button class="btn">Buy Now</button>
        <button class="btn">🛒</button>
        </div>
      </article>

      <article class="product-card">
        <img class="product-image placeholder-thumb" src="Views/assets/img/sp3.png" alt="">
        <h3 class="product-name">Panerai</h3>
        <div class="product-meta">40mm • Silver Platinum</div>
        <div class="product-price">4.900.000</div>
        <div class="actions">
        <button class="btn">Buy Now</button>
        <button class="btn">🛒</button>
        </div>
      </article> -->

    </div>
  </section>

  <!-- For Ladies Banner -->
  <section class="ladies-banner">
    <div class="container">
      <img class="ladies-hero placeholder-banner" src="Views/assets/img/banner2.png" alt="">
      <div class="ladies-grid">
        <img class="card placeholder-prod-wide1" src="Views/assets/img/banner3.png" alt="">
        <img class="card placeholder-prod-wide2" src="Views/assets/img/banner4.png" alt="">
      </div>
    </div>
  </section>

  <!-- Rolex watch grid (example) -->
  <section class="section container">
    <h2>ROLEX WATCH</h2>
    <div class="product-grid">
      <?= $html_products ?>
    </div>
  </section>

  <!-- Smart watch promo -->
  <!-- <section class="container promo-large">
    <div class="placeholder-promo-wide"></div>
  </section> -->

  <!-- Apple watch -->
  <!-- <section class="section container">
    <h2>APPLE WATCH</h2>
    <div class="product-grid">
      <article class="product-card">
        <div class="product-image placeholder-thumb"></div>
        <h3 class="product-name">Ultra II</h3>
        <div class="product-meta">42mm • Dark D...</div>
        <div class="product-price">22.580.000₫</div>
        <button class="btn">Buy Now</button>
      </article>
      <article class="product-card">
        <div class="product-image placeholder-thumb"></div>
        <h3 class="product-name">Black–C</h3>
        <div class="product-meta">42mm • Plain Black</div>
        <div class="product-price">10.799.000₫</div>
        <button class="btn">Buy Now</button>
      </article>
      <article class="product-card">
        <div class="product-image placeholder-thumb"></div>
        <h3 class="product-name">Black–SE</h3>
        <div class="product-meta">42mm • Fabric Black</div>
        <div class="product-price">5.889.000₫</div>
        <button class="btn">Buy Now</button>
      </article>
    </div>
  </section> -->

  <!-- Hot News -->
  <!-- <section class="container news-section">
    <h2>Hot News</h2>
    <div class="news-grid">
      <div class="news-card placeholder-news"></div>
      <div class="news-card placeholder-news"></div>
      <div class="news-card placeholder-news-side">
        <div class="news-list">
          <div class="news-list-item placeholder-news-small"></div>
          <div class="news-list-item placeholder-news-small"></div>
          <div class="news-list-item placeholder-news-small"></div>
        </div>
      </div>
    </div>
  </section> -->