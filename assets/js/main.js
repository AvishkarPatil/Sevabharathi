/* ============================================================
   Seva Bharathi by @AvishkarPatil
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    buildDropdowns();
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initCounters();
    initReveal();
    initLangFab();
    initMarquees();
    initHeroSlider();
    initSupporters();
    initTestimonials();
    initTestimonialContent();
    initNewsletters();
    initNewsletterYears();
    initBlogFilter();
    initEventCards();
    initEventTabs();
    initHomeEvents();
    initJourney();
    initAboutMedia();
    initAboutSnapshot();
    initImpactGrid();
    initProgramVideos();
    initFeedback();
    initStorySlider();
    initVideoPopup();
    initTeamTabs();
    initProgramContent();
    initGallery();
  });

  /* ---------- Dropdown nav (items whose label starts with "-" become children) ---------- */
  function buildDropdowns() {
    document.querySelectorAll('.nav-build').forEach(function (navRoot) {
      var nodes = navRoot.querySelectorAll('.nav > li');
      var parent = null, list = null;
      nodes.forEach(function (node) {
        var link = node.querySelector('a');
        if (!link) return;
        var text = link.textContent.trim();
        if (text.charAt(0) === '-') {
          // strip leading dashes
          link.textContent = text.replace(/^-+\s*/, '');
          if (!parent) {
            var prev = node.previousElementSibling;
            if (prev) {
              parent = prev;
              parent.classList.add('has-dropdown');
              var pLink = parent.querySelector('a');
              if (pLink && !pLink.querySelector('svg')) {
                pLink.insertAdjacentHTML('beforeend',
                  ' <svg width="11" height="7" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>');
              }
              list = document.createElement('ul');
              list.className = 'nav-dropdown';
              parent.appendChild(list);
            }
          }
          if (list) list.appendChild(node);
        } else {
          parent = null;
          list = null;
        }
      });
      navRoot.classList.add('nav-ready');
    });
  }

  /* ---------- Mobile drawer ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var drawer = document.querySelector('.mobile-drawer');
    if (!toggle || !drawer) return;
    var close = drawer.querySelector('.mobile-close');

    function open() { drawer.classList.add('open'); toggle.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function shut() { drawer.classList.remove('open'); toggle.classList.remove('active'); document.body.style.overflow = ''; }

    toggle.addEventListener('click', function () {
      drawer.classList.contains('open') ? shut() : open();
    });
    if (close) close.addEventListener('click', shut);
    drawer.addEventListener('click', function (e) { if (e.target === drawer) shut(); });
    drawer.querySelectorAll('a').forEach(function (a) {
      if (!a.parentElement.classList.contains('has-dropdown')) a.addEventListener('click', shut);
    });
    // Accordion: parent items with a submenu toggle open/close instead of navigating
    drawer.querySelectorAll('.has-dropdown > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
  }

  /* ---------- Sticky header ---------- */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('scrolled', window.scrollY > 50);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ---------- Counter animation ---------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-target]');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { obs.observe(el); });
  }

  function animateCount(el) {
    var raw = (el.getAttribute('data-target') || '').trim();
    // capture leading number, prefix and suffix (e.g. "25,000+", "1,200+")
    var match = raw.match(/[\d,\.]+/);
    if (!match) { el.textContent = raw; return; }
    var numStr = match[0];
    var prefix = raw.slice(0, match.index);
    var suffix = raw.slice(match.index + numStr.length);
    var target = parseFloat(numStr.replace(/,/g, ''));
    if (isNaN(target)) { el.textContent = raw; return; }
    var hasComma = numStr.indexOf(',') !== -1;
    var duration = 1600, start = null;
    function fmt(n) {
      n = Math.floor(n);
      return hasComma ? n.toLocaleString('en-IN') : String(n);
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- Marquee: duplicate track for seamless loop ---------- */
  function initMarquees() {
    document.querySelectorAll('.marquee-track').forEach(function (track) {
      if (track.children.length === 0) return;
      track.innerHTML += track.innerHTML;
    });
  }

  /* ---------- Hero slider ---------- */
  function initHeroSlider() {
    var slider = document.querySelector('.hero-slider');
    if (!slider) return;
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slide'));
    if (slides.length === 0) return;
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.hero-dot'));
    var prev = slider.querySelector('.hero-arrow.prev');
    var next = slider.querySelector('.hero-arrow.next');
    var current = 0, timer = null;
    var INTERVAL = 6000;

    function go(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle('active', idx === current); });
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === current); });
    }
    function nextSlide() { go(current + 1); }
    function start() { clearInterval(timer); if (slides.length > 1) timer = setInterval(nextSlide, INTERVAL); }
    function reset() { clearInterval(timer); start(); }

    dots.forEach(function (d, idx) { d.addEventListener('click', function () { go(idx); reset(); }); });
    if (next) next.addEventListener('click', function () { go(current + 1); reset(); });
    if (prev) prev.addEventListener('click', function () { go(current - 1); reset(); });

    // pause on hover
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', start);

    go(0);
    start();
  }

  /* ---------- Supporters: two-row opposite-direction logo slider ---------- */
  function initSupporters() {
    var source = document.querySelector('.supporters-source');
    var slider = document.querySelector('.logo-slider');
    var track = document.getElementById('supporters-track');
    var track2 = document.getElementById('supporters-track-2');
    if (!source || !track || !slider) return;
    var imgs = source.querySelectorAll('img');
    if (!imgs.length) { var sec = source.closest('.supporters'); if (sec) sec.style.display = 'none'; return; }

    var items = [];
    imgs.forEach(function (img) {
      items.push('<div class="logo-tile"><img src="' + (img.getAttribute('src') || '') + '" alt="' + (img.getAttribute('alt') || 'Supporter') + '" loading="lazy"></div>');
    });
    function shuffle(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    }
    var r1 = shuffle(items).join('');
    track.innerHTML = r1 + r1;
    if (track2) {
      var r2 = shuffle(items).join('');   // independent random order on row 2
      track2.innerHTML = r2 + r2;
    }
    source.remove();

    var pos1 = 0, pos2 = 0, speed1 = 0.32, speed2 = 0.32, paused = false, half1 = 0, half2 = 0;
    function measure() {
      half1 = track.scrollWidth / 2;
      half2 = track2 ? track2.scrollWidth / 2 : 0;
      if (track2 && pos2 === 0) pos2 = -half2 + 120; // start row 2 offset so tiles never sit directly below row 1
    }
    measure();
    window.addEventListener('load', measure);
    setTimeout(measure, 800);

    function frame() {
      if (!paused) {
        if (half1 > 0) { pos1 -= speed1; if (-pos1 >= half1) pos1 += half1; track.style.transform = 'translateX(' + pos1 + 'px)'; }
        if (track2 && half2 > 0) { pos2 += speed2; if (pos2 >= 0) pos2 -= half2; track2.style.transform = 'translateX(' + pos2 + 'px)'; }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    slider.addEventListener('mouseenter', function () { paused = true; });
    slider.addEventListener('mouseleave', function () { paused = false; });

    var step = 240;
    function nudge(dir) {
      pos1 += dir * step;
      if (pos1 > 0) pos1 -= half1;
      if (-pos1 >= half1) pos1 += half1;
      track.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      track.style.transform = 'translateX(' + pos1 + 'px)';
      setTimeout(function () { track.style.transition = ''; }, 520);
    }
    var prev = slider.querySelector('.ls-arrow.prev');
    var next = slider.querySelector('.ls-arrow.next');
    if (prev) prev.addEventListener('click', function () { nudge(1); });
    if (next) next.addEventListener('click', function () { nudge(-1); });

    function bindEdge(sel, cls) {
      var el = slider.querySelector(sel);
      if (!el) return;
      el.addEventListener('mouseenter', function () { slider.classList.add(cls); });
      el.addEventListener('mouseleave', function () { slider.classList.remove(cls); });
    }
    bindEdge('.ls-edge.left', 'show-prev');
    bindEdge('.ls-edge.right', 'show-next');
    bindEdge('.ls-arrow.prev', 'show-prev');
    bindEdge('.ls-arrow.next', 'show-next');
  }

  /* ---------- Testimonials: expanding slider ---------- */
  function initTestimonials() {
    var slider = document.getElementById('tslider');
    if (!slider) return;
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.tslide'));
    if (slides.length < 2) return;
    slides.forEach(function (s) {
      s.addEventListener('mouseenter', function () {
        if (window.innerWidth < 861) return;
        slides.forEach(function (x) { x.classList.remove('active'); });
        s.classList.add('active');
      });
    });
  }

  /* ---------- Testimonials: name (line 1) + quote (line 2+) from post body ---------- */
  function initTestimonialContent() {
    document.querySelectorAll('.tslide').forEach(function (slide) {
      var src = slide.querySelector('.tslide-source');
      if (!src) return;
      var nodes = Array.prototype.slice.call(src.children);
      if (nodes.length) {
        var nameEl = slide.querySelector('.tslide-name');
        var quoteEl = slide.querySelector('.tslide-quote');
        if (nameEl && nodes[0]) nameEl.textContent = (nodes[0].textContent || '').trim();
        if (quoteEl && nodes.length > 1) {
          var rest = nodes.slice(1).map(function (n) { return (n.textContent || '').trim(); }).filter(Boolean).join(' ');
          if (rest) quoteEl.textContent = rest;
        }
      }
      src.remove();
    });
  }

  /* ---------- Lightbox for the home gallery ---------- */
  function initLightbox() {
    var galleries = document.querySelectorAll('.home-gallery');
    if (!galleries.length) return;
    var imgs = [];
    galleries.forEach(function (g) {
      g.querySelectorAll('img').forEach(function (im) { imgs.push(im); });
    });
    if (!imgs.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button class="lightbox-nav lb-prev" aria-label="Previous"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<img alt="Enlarged image">' +
      '<button class="lightbox-nav lb-next" aria-label="Next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
    document.body.appendChild(box);
    var boxImg = box.querySelector('img');
    var current = 0;

    function srcFor(im) {
      // prefer a larger Ghost size if available
      return im.getAttribute('src');
    }
    function show(i) { current = (i + imgs.length) % imgs.length; boxImg.src = srcFor(imgs[current]); }
    function open(i) { show(i); box.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { box.classList.remove('open'); document.body.style.overflow = ''; }

    imgs.forEach(function (im, i) { im.addEventListener('click', function () { open(i); }); });
    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- Home gallery: bento rectangle + paging + lightbox ---------- */
  function initGallery() {
    var wrap = document.querySelector('.home-gallery');
    if (!wrap) return;
    var source = wrap.querySelector('.gallery-source');
    var bento = wrap.querySelector('.gallery-bento');
    if (!source || !bento) return;
    var urls = [];
    source.querySelectorAll('img').forEach(function (im) { var s = im.getAttribute('src'); if (s && urls.indexOf(s) === -1) urls.push(s); });
    source.remove();
    if (!urls.length) { var sec = wrap.closest('section'); if (sec) sec.style.display = 'none'; return; }

    var PER = 7, page = 0, pages = Math.ceil(urls.length / PER);
    var pattern = ['big', '', '', 'wide', 'wide', '', ''];
    if (wrap.closest('.prog-gallery')) {           // program pages: 2-row bento
      PER = 5;
      pattern = ['big', '', '', '', ''];
      pages = Math.ceil(urls.length / PER);
    }
    function render() {
      var set = urls.slice(page * PER, page * PER + PER);
      var html = '';
      set.forEach(function (u, i) {
        var cls = pattern[i % pattern.length];
        html += '<div class="g-item' + (cls ? ' ' + cls : '') + '" data-idx="' + (page * PER + i) + '"><img src="' + u + '" alt="Gallery image" loading="lazy"></div>';
      });
      bento.innerHTML = html;
    }
    render();

    var prev = wrap.querySelector('.g-arrow.prev');
    var next = wrap.querySelector('.g-arrow.next');
    if (pages > 1) {
      if (prev) prev.hidden = false;
      if (next) next.hidden = false;
      if (prev) prev.addEventListener('click', function () { page = (page - 1 + pages) % pages; render(); });
      if (next) next.addEventListener('click', function () { page = (page + 1) % pages; render(); });
    }

    // Lightbox over ALL images
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button class="lightbox-nav lb-prev" aria-label="Previous"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<img alt="Enlarged gallery image">' +
      '<button class="lightbox-nav lb-next" aria-label="Next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
    document.body.appendChild(box);
    var boxImg = box.querySelector('img');
    var cur = 0;
    function show(i) { cur = (i + urls.length) % urls.length; boxImg.src = urls[cur]; }
    function open(i) { show(i); box.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
    bento.addEventListener('click', function (e) {
      var it = e.target.closest('.g-item');
      if (it) open(parseInt(it.getAttribute('data-idx'), 10) || 0);
    });
    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
    box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* ---------- Newsletters: year filter ---------- */
  function initNewsletterYears() {
    var grid = document.getElementById('nl-grid');
    var sel = document.getElementById('nl-year');
    if (!grid || !sel) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.nl-card'));
    var empty = document.getElementById('nl-empty');
    var years = [];
    cards.forEach(function (c) { var y = c.getAttribute('data-year'); if (y && years.indexOf(y) === -1) years.push(y); });
    years.sort(function (a, b) { return b - a; });
    years.forEach(function (y) { var o = document.createElement('option'); o.value = y; o.textContent = y; sel.appendChild(o); });
    sel.addEventListener('change', function () {
      var v = sel.value, any = 0;
      cards.forEach(function (c) { var m = v === 'all' || c.getAttribute('data-year') === v; c.style.display = m ? '' : 'none'; if (m) any++; });
      if (empty) empty.hidden = any > 0;
    });
  }

  /* ---------- Newsletters: PDF popup viewer ---------- */
  function initNewsletters() {
    var cards = document.querySelectorAll('.nl-card');
    if (!cards.length) return;

    // Build the modal once
    var modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.innerHTML =
      '<div class="pdf-modal-inner">' +
        '<div class="pdf-bar">' +
          '<span class="pdf-name"></span>' +
          '<span class="pdf-bar-actions">' +
            '<a class="pdf-dl" target="_blank" rel="noopener"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Download</a>' +
            '<button class="pdf-close" aria-label="Close">&times;</button>' +
          '</span>' +
        '</div>' +
        '<iframe title="PDF viewer"></iframe>' +
      '</div>';
    document.body.appendChild(modal);
    var frame = modal.querySelector('iframe');
    var nameEl = modal.querySelector('.pdf-name');
    var dl = modal.querySelector('.pdf-dl');

    function openPdf(url, name) {
      frame.src = url;
      nameEl.textContent = name || 'Document';
      dl.href = url;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(function () { frame.src = ''; }, 300);
    }
    modal.querySelector('.pdf-close').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

    cards.forEach(function (card) {
      var source = card.querySelector('.nl-source');
      var pdf = '';
      if (source) {
        var link = source.querySelector('a[href*=".pdf"], a[href*=".PDF"]');
        if (link) pdf = link.getAttribute('href');
        source.remove();
      }
      var title = (card.querySelector('.nl-title') ? card.querySelector('.nl-title').textContent : '').trim();
      var url = card.getAttribute('data-url');
      if (pdf) {
        var cover = card.querySelector('.nl-cover');
        if (cover) renderPdfThumb(pdf, cover);
      }
      function activate(e) {
        e.preventDefault();
        if (pdf) openPdf(pdf, title);
        else if (url) window.location.href = url;
      }
      card.addEventListener('click', activate);
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') activate(e); });
    });
  }

  /* ---------- PDF.js: render first page of a PDF as a card thumbnail ---------- */
  var _pdfjs = null, _pdfjsLoading = null;
  function loadPdfJs(cb) {
    if (_pdfjs) { cb(_pdfjs); return; }
    if (_pdfjsLoading) { _pdfjsLoading.push(cb); return; }
    _pdfjsLoading = [cb];
    var base = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
    var s = document.createElement('script');
    s.src = base + 'pdf.min.js';
    s.onload = function () {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = base + 'pdf.worker.min.js';
        _pdfjs = window.pdfjsLib;
        _pdfjsLoading.forEach(function (fn) { fn(_pdfjs); });
        _pdfjsLoading = null;
      }
    };
    s.onerror = function () { _pdfjsLoading = null; };
    document.head.appendChild(s);
  }
  function renderPdfThumb(pdfUrl, container) {
    loadPdfJs(function (lib) {
      lib.getDocument(pdfUrl).promise.then(function (pdf) {
        return pdf.getPage(1);
      }).then(function (page) {
        var v0 = page.getViewport({ scale: 1 });
        var scale = 700 / v0.width;
        var vp = page.getViewport({ scale: scale });
        var canvas = document.createElement('canvas');
        canvas.width = vp.width; canvas.height = vp.height;
        canvas.className = 'nl-pdf-canvas';
        page.render({ canvasContext: canvas.getContext('2d'), viewport: vp });
        container.innerHTML = '';
        container.appendChild(canvas);
      }).catch(function () { /* keep the feature-image / placeholder fallback */ });
    });
  }

  /* ---------- Blog: search + category + client pagination ---------- */
  function initBlogFilter() {
    var grid = document.getElementById('blog-grid');
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.blog-card'));
    var search = document.getElementById('blog-search');
    var catSel = document.getElementById('blog-cat');
    var empty = document.getElementById('blog-empty');
    var pager = document.getElementById('blog-pager');
    var pageInfo = document.getElementById('blog-pageinfo');
    var PER = 6, page = 1, filtered = cards;

    // build category options
    if (catSel) {
      var seen = {};
      cards.forEach(function (c) {
        var slug = c.getAttribute('data-cat'), name = c.getAttribute('data-catname');
        if (slug && !seen[slug]) { seen[slug] = true; var o = document.createElement('option'); o.value = slug; o.textContent = name || slug; catSel.appendChild(o); }
      });
    }

    function apply() {
      var q = (search ? search.value : '').trim().toLowerCase();
      var cat = catSel ? catSel.value : 'all';
      filtered = cards.filter(function (c) {
        var okText = !q || (c.getAttribute('data-title') || '').toLowerCase().indexOf(q) !== -1;
        var okCat = cat === 'all' || c.getAttribute('data-cat') === cat;
        return okText && okCat;
      });
      page = 1;
      render();
    }
    function render() {
      var total = filtered.length;
      var pages = Math.max(1, Math.ceil(total / PER));
      if (page > pages) page = pages;
      cards.forEach(function (c) { c.style.display = 'none'; });
      filtered.slice((page - 1) * PER, page * PER).forEach(function (c) { c.style.display = ''; });
      if (empty) empty.style.display = total ? 'none' : 'block';
      if (pager) {
        if (pages > 1) {
          pager.removeAttribute('hidden');
          pageInfo.textContent = 'Page ' + page + ' of ' + pages;
          pager.querySelector('.pg-prev').disabled = page <= 1;
          pager.querySelector('.pg-next').disabled = page >= pages;
          pager.querySelector('.pg-prev').style.opacity = page <= 1 ? '0.4' : '1';
          pager.querySelector('.pg-next').style.opacity = page >= pages ? '0.4' : '1';
        } else { pager.setAttribute('hidden', ''); }
      }
    }
    if (search) search.addEventListener('input', apply);
    if (catSel) catSel.addEventListener('change', apply);
    if (pager) {
      pager.querySelector('.pg-prev').addEventListener('click', function () { if (page > 1) { page--; render(); scrollToGrid(); } });
      pager.querySelector('.pg-next').addEventListener('click', function () { page++; render(); scrollToGrid(); });
    }
    function scrollToGrid() { var t = grid.getBoundingClientRect().top + window.scrollY - 130; window.scrollTo({ top: t, behavior: 'smooth' }); }
    render();
  }

  /* ---------- Events: per-card auto image slider ---------- */
  function initEventCards() {
    var cards = document.querySelectorAll('.ev-card');
    if (!cards.length) return;
    cards.forEach(function (card) {
      var source = card.querySelector('.ev-source');
      var slidesWrap = card.querySelector('.ev-slides');
      var dotsWrap = card.querySelector('.ev-dots');
      if (!slidesWrap) return;
      var urls = [];
      var feat = card.getAttribute('data-feature');
      if (feat) urls.push(feat);
      // date badge from data-date (event date in the post Excerpt, YYYY-MM-DD)
      var dateEl = card.querySelector('.ev-date');
      if (dateEl) dateEl.innerHTML = eventBadge(card.getAttribute('data-date'));
      if (source) {
        // description from the first paragraph of the body (trimmed to a few words)
        var descEl = card.querySelector('.ev-desc');
        if (descEl) {
          var pp = source.querySelector('p');
          if (pp) {
            var words = (pp.textContent || '').trim().split(/\s+/);
            descEl.textContent = words.slice(0, 20).join(' ') + (words.length > 20 ? '…' : '');
          }
        }
        source.querySelectorAll('img').forEach(function (im) {
          var s = im.getAttribute('src');
          if (s && urls.indexOf(s) === -1) urls.push(s);
        });
        source.remove();
      }
      if (!urls.length) { slidesWrap.innerHTML = '<div class="ev-slide active"><div class="ev-slide-ph"></div></div>'; return; }

      var html = '';
      urls.forEach(function (u, i) { html += '<div class="ev-slide' + (i === 0 ? ' active' : '') + '"><img src="' + u + '" alt="" loading="lazy"></div>'; });
      slidesWrap.innerHTML = html;
      var slides = slidesWrap.querySelectorAll('.ev-slide');

      if (slides.length > 1 && dotsWrap) {
        var d = '';
        urls.forEach(function (u, i) { d += '<button class="' + (i === 0 ? 'active' : '') + '" aria-label="Image ' + (i + 1) + '"></button>'; });
        dotsWrap.innerHTML = d;
        var dots = dotsWrap.querySelectorAll('button');
        var cur = 0, timer = null;
        function go(i) {
          cur = (i + slides.length) % slides.length;
          slides.forEach(function (s, k) { s.classList.toggle('active', k === cur); });
          dots.forEach(function (b, k) { b.classList.toggle('active', k === cur); });
        }
        function start() { timer = setInterval(function () { go(cur + 1); }, 3000); }
        function stop() { clearInterval(timer); }
        dots.forEach(function (b, k) { b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); go(k); stop(); start(); }); });
        card.addEventListener('mouseenter', stop);
        card.addEventListener('mouseleave', start);
        start();
      } else if (dotsWrap) { dotsWrap.style.display = 'none'; }
    });
  }

  /* ---------- Events: Upcoming / Ongoing / Past tabs (by date) ---------- */
  var EV_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function eventBadge(ds) {
    if (!ds) return '';
    var p = ds.split('-');
    if (p.length < 3) return '';
    return '<span class="m">' + (EV_MONTHS[(+p[1]) - 1] || '') + '</span><span class="d">' + p[2] + '</span>';
  }
  function eventCategory(ds, today) {
    if (!ds) return 'past';
    var p = ds.split('-');
    var d = new Date(+p[0], (+p[1]) - 1, +p[2]); d.setHours(0, 0, 0, 0);
    if (d.getTime() > today.getTime()) return 'upcoming';
    if (d.getTime() === today.getTime()) return 'ongoing';
    return 'past';
  }
  function initEventTabs() {
    var tabsWrap = document.getElementById('ev-tabs');
    var grid = document.querySelector('.ev-grid');
    if (!tabsWrap || !grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.ev-card'));
    var empty = document.getElementById('ev-empty');
    var today = new Date(); today.setHours(0, 0, 0, 0);
    cards.forEach(function (c) { c.setAttribute('data-cat', eventCategory(c.getAttribute('data-date'), today)); });
    // upcoming/ongoing soonest-first, past most-recent-first
    cards.sort(function (a, b) {
      var da = a.getAttribute('data-date') || '', db = b.getAttribute('data-date') || '';
      var pa = a.getAttribute('data-cat') === 'past', pb = b.getAttribute('data-cat') === 'past';
      if (pa !== pb) return pa ? 1 : -1;
      return pa ? db.localeCompare(da) : da.localeCompare(db);
    });
    cards.forEach(function (c) { grid.appendChild(c); });
    var tabs = Array.prototype.slice.call(tabsWrap.querySelectorAll('.ev-tab'));
    function count(cat) { return cards.filter(function (c) { return c.getAttribute('data-cat') === cat; }).length; }
    function show(cat) {
      tabs.forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-cat') === cat); });
      var any = 0;
      cards.forEach(function (c) { var m = c.getAttribute('data-cat') === cat; c.style.display = m ? '' : 'none'; if (m) any++; });
      if (empty) empty.hidden = any > 0;
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-cat')); }); });
    show(count('upcoming') ? 'upcoming' : (count('ongoing') ? 'ongoing' : 'past'));
  }

  /* ---------- Video popup for video stories (home + stories) ---------- */
  function initVideoPopup() {
    var modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = '<div class="video-modal-inner"><button class="video-modal-close" aria-label="Close">&times;</button><div class="video-modal-frame"></div></div>';
    document.body.appendChild(modal);
    var host = modal.querySelector('.video-modal-frame');
    function close() { modal.classList.remove('open'); document.body.style.overflow = ''; host.innerHTML = ''; }
    modal.querySelector('.video-modal-close').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

    function openVideo(src) {
      var media = src && src.querySelector('iframe, video');
      if (!media) return;
      var clone = media.cloneNode(true);
      if (clone.tagName === 'IFRAME') {
        var s = clone.getAttribute('src') || '';
        if (s && s.indexOf('autoplay') === -1) clone.setAttribute('src', s + (s.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1');
      }
      host.innerHTML = '';
      host.appendChild(clone);
      if (clone.tagName === 'VIDEO') { clone.setAttribute('controls', ''); if (clone.play) clone.play(); }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function srcFor(el) {
      var card = el.closest('.story-card, .blog-card');
      return card && card.querySelector('.story-video-src');
    }

    // play badges: reveal if the post body has a video, else remove
    Array.prototype.forEach.call(document.querySelectorAll('.story-play[data-video-trigger]'), function (btn) {
      var src = srcFor(btn);
      var media = src && src.querySelector('iframe, video');
      if (!media) { if (btn.parentNode) btn.parentNode.removeChild(btn); return; }
      btn.hidden = false;
      btn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); openVideo(src); });
    });

    // home card cover: if the card has a video, the whole card plays it (Read story still links to the post)
    Array.prototype.forEach.call(document.querySelectorAll('.story-card-cover'), function (cover) {
      var src = srcFor(cover);
      var media = src && src.querySelector('iframe, video');
      if (media) cover.addEventListener('click', function (e) { e.preventDefault(); openVideo(src); });
    });

    // remove unused hidden sources (no video)
    Array.prototype.forEach.call(document.querySelectorAll('.story-video-src'), function (src) {
      if (!src.querySelector('iframe, video') && src.parentNode) src.parentNode.removeChild(src);
    });
  }

  /* ---------- Home success-stories slider (prev/next + slow auto-rotate) ---------- */
  function initStorySlider() {
    var slider = document.getElementById('story-slider');
    if (!slider) return;
    var track = slider.querySelector('.story-track');
    if (!track) return;
    var cards = Array.prototype.slice.call(track.children);
    if (!cards.length) return;
    var prev = document.querySelector('.story-nav .sn-prev');
    var next = document.querySelector('.story-nav .sn-next');
    var idx = 0, timer = null;

    function step() {
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
      return cards[0].getBoundingClientRect().width + gap;
    }
    function perView() {
      return Math.max(1, Math.round(slider.clientWidth / step()));
    }
    function maxIdx() { return Math.max(0, cards.length - perView()); }
    function apply() {
      if (idx > maxIdx()) idx = maxIdx();
      if (idx < 0) idx = 0;
      track.style.transform = 'translateX(' + (-idx * step()) + 'px)';
      if (prev) prev.disabled = idx <= 0;
      if (next) next.disabled = idx >= maxIdx();
    }
    function go(n) { idx = n; apply(); }

    if (prev) prev.addEventListener('click', function () { go(idx - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(idx <= maxIdx() - 1 ? idx + 1 : 0); restart(); });

    function start() { if (cards.length > perView()) timer = setInterval(function () { go(idx >= maxIdx() ? 0 : idx + 1); }, 5000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    window.addEventListener('resize', apply);
    apply();
    start();
  }

  /* ---------- Home: show only upcoming/ongoing events (max 3) ---------- */
  function initHomeEvents() {
    var sec = document.getElementById('home-events');
    var grid = document.getElementById('he-grid');
    if (!sec || !grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.he-card'));
    var today = new Date(); today.setHours(0, 0, 0, 0);
    cards.forEach(function (c) { var b = c.querySelector('.he-date'); if (b) b.innerHTML = eventBadge(c.getAttribute('data-date')); });
    // soonest upcoming first
    cards.sort(function (a, b) { return (a.getAttribute('data-date') || '').localeCompare(b.getAttribute('data-date') || ''); });
    cards.forEach(function (c) { grid.appendChild(c); });
    var shown = 0, MAX = 3;
    cards.forEach(function (c) {
      var cat = eventCategory(c.getAttribute('data-date'), today);
      if ((cat === 'upcoming' || cat === 'ongoing') && shown < MAX) { c.style.display = ''; shown++; }
      else { c.style.display = 'none'; }
    });
    if (shown > 0) sec.hidden = false;
  }

  /* ---------- Our Journey: animated timeline + photo stack ---------- */
  function initJourney() {
    var timeline = document.getElementById('journey-timeline');
    var progress = document.getElementById('jt-progress');
    var stackHost = document.getElementById('journey-cards');
    if (!timeline || !progress) return;
    var items = Array.prototype.slice.call(timeline.querySelectorAll('.jt-item'));
    if (!items.length) return;
    var rot = [-3, 4, -5, 2, -4, 5, -2];

    // build photo-stack cards from each item's data-img
    var cards = [];
    if (stackHost) {
      items.forEach(function (it, i) {
        var img = it.getAttribute('data-img');
        if (!img) return; // no image for this year -> no card (photo stays on the previous available one)
        var card = document.createElement('div');
        card.className = 'js-card';
        card.innerHTML = '<img src="' + img + '" alt="">';
        card.setAttribute('data-item-index', i);
        stackHost.appendChild(card);
        cards.push(card);
      });
    }

    var positions = [];
    function calc() {
      var base = timeline.getBoundingClientRect().top;
      positions = items.map(function (it) {
        var d = it.querySelector('.jt-dot');
        var r = d.getBoundingClientRect();
        return (r.top - base) + r.height / 2 - 14;
      });
    }

    var active = -1;
    function setActive(idx) {
      if (idx === active) return;
      active = idx;
      items.forEach(function (it, i) {
        it.classList.toggle('is-past', i < idx);
        it.classList.toggle('is-active', i === idx);
      });
      cards.forEach(function (c, i) {
        var itemIdx = parseInt(c.getAttribute('data-item-index'), 10) || 0;
        var deg = rot[i % rot.length];
        if (itemIdx <= idx) { c.style.zIndex = 30 + itemIdx; c.style.opacity = '1'; c.style.transform = 'translateY(0) scale(1) rotate(' + deg + 'deg)'; }
        else { c.style.zIndex = 10; c.style.opacity = '0'; c.style.transform = 'translateY(-30px) scale(1.05) rotate(' + deg + 'deg)'; }
      });
    }

    var progressY = 0, speed = 0.3, running = false;
    function frame() {
      if (!positions.length) calc();
      progressY += speed;
      var max = positions[positions.length - 1] + 50;
      if (progressY > max) progressY = 0;
      progress.style.height = progressY + 'px';
      var passed = 0;
      for (var i = positions.length - 1; i >= 0; i--) { if (progressY >= positions[i]) { passed = i; break; } }
      setActive(passed);
      requestAnimationFrame(frame);
    }

    items.forEach(function (it, i) {
      it.addEventListener('click', function () {
        if (!positions.length) calc();
        progressY = positions[i] + 1;
        progress.style.height = progressY + 'px';
        setActive(i);
      });
    });

    calc();
    setActive(0);
    if (!('IntersectionObserver' in window)) { running = true; setTimeout(function () { requestAnimationFrame(frame); }, 500); }
    else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !running) { running = true; calc(); setTimeout(function () { requestAnimationFrame(frame); }, 400); }
        });
      }, { threshold: 0.2 });
      io.observe(timeline);
    }
    window.addEventListener('resize', calc);
  }

  /* ---------- About "Who We Are" media (YouTube video or image) ---------- */
  function initAboutMedia() {
    var el = document.querySelector('.ww-media');
    if (!el) return;
    var frame = el.querySelector('.ww-frame');
    if (!frame) return;
    var media = (el.getAttribute('data-media') || '').trim();
    var fallback = (el.getAttribute('data-fallback') || '').trim();

    function ytId(url) {
      var m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
      return m ? m[1] : '';
    }

    var id = media ? ytId(media) : '';
    if (id) {
      frame.classList.add('is-video');
      frame.innerHTML =
        '<img src="https://img.youtube.com/vi/' + id + '/hqdefault.jpg" alt="Play video">' +
        '<button class="ww-play" aria-label="Play video"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7z"/></svg></button>';
      // upgrade thumbnail to high-res if available
      var hi = new Image();
      hi.onload = function () { if (hi.naturalWidth > 140) { var im = frame.querySelector('img'); if (im) im.src = hi.src; } };
      hi.src = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
      frame.addEventListener('click', function () {
        frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      });
    } else if (media) {
      frame.innerHTML = '<img src="' + media + '" alt="About us">';
      frame.style.cursor = 'default';
    } else if (fallback) {
      frame.innerHTML = '<img src="' + fallback + '" alt="About us">';
      frame.style.cursor = 'default';
    }
  }

  /* ---------- Team: category tabs (VoN-style) ----------
     markup: any number of .team-grid-section blocks + one .team-category-bar
     with .team-category-tab buttons. Tab N shows section N. The bar is
     auto-moved to the top. */
  function initTeamTabs() {
    var wrap = document.querySelector('.team-content') || document.querySelector('.post-content') || document.querySelector('main') || document.body;
    if (!wrap) return;

    var bar = wrap.querySelector('.team-category-bar');
    var sections = Array.prototype.slice.call(wrap.querySelectorAll('.team-grid-section'));
    if (!bar || !sections.length) return;

    var tabs = Array.prototype.slice.call(bar.querySelectorAll('.team-category-tab'));
    if (!tabs.length) return;

    wrap.insertBefore(bar, wrap.firstChild); // pin tabs to the top

    var startIdx = 0;
    tabs.forEach(function (t, i) { if (t.classList.contains('active')) startIdx = i; });
    if (startIdx >= sections.length) startIdx = 0;

    function show(idx) {
      tabs.forEach(function (t, i) { t.classList.toggle('active', i === idx); });
      // one section per tab (by order). If a tab has no matching section,
      // fall back to the only section when there's just one.
      var sIdx = (sections.length === 1) ? 0 : idx;
      sections.forEach(function (s, i) { s.style.display = (i === sIdx ? '' : 'none'); });
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
    });
    show(startIdx);
  }

  /* ---------- Stories: feedback slider (auto-rotate + optional video) ---------- */
  function initFeedback() {
    var slider = document.getElementById('fb-slider');
    if (!slider) return;
    var items = Array.prototype.slice.call(slider.querySelectorAll('.fb-item'));
    if (!items.length) return;
    var dotsHost = document.getElementById('fb-dots');
    var idx = 0, timer = null;

    items.forEach(function (item) {
      var src = item.querySelector('.fb-source');
      var embed = item.querySelector('.fb-embed');
      if (src) {
        var media = src.querySelector('iframe, video');
        if (media && embed) embed.appendChild(media);
        if (src.parentNode) src.parentNode.removeChild(src);
      }
      if (!embed || !embed.querySelector('iframe, video')) { item.classList.add('fb-novideo'); }
      var play = item.querySelector('.fb-play');
      if (play) play.addEventListener('click', function (e) {
        e.stopPropagation();
        item.classList.add('fb-playing');
        stop();
        var f = embed.querySelector('iframe');
        if (f) { var s = f.getAttribute('src') || ''; if (s && s.indexOf('autoplay') === -1) f.setAttribute('src', s + (s.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1'); }
        var v = embed.querySelector('video'); if (v) { v.setAttribute('controls', ''); v.play(); }
      });
    });

    var dots = [];
    if (dotsHost && items.length > 1) {
      items.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'fb-dot' + (i === 0 ? ' active' : '');
        b.addEventListener('click', function () { go(i); restart(); });
        dotsHost.appendChild(b); dots.push(b);
      });
    }
    function go(n) {
      idx = (n + items.length) % items.length;
      items.forEach(function (it, i) { it.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    }
    function start() { if (items.length > 1) timer = setInterval(function () { go(idx + 1); }, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    start();
  }

  /* ---------- Program video stories: split body into video + text, alternate sides ---------- */
  function initProgramVideos() {
    var cards = document.querySelectorAll('.pv-card');
    if (!cards.length) return;
    Array.prototype.forEach.call(cards, function (card, i) {
      if (i % 2 === 1) card.classList.add('pv-rev');
      var src = card.querySelector('.pv-source');
      var embed = card.querySelector('.pv-embed');
      var desc = card.querySelector('.pv-desc');
      if (src) {
        var media = src.querySelector('iframe, video');
        if (media && embed) embed.appendChild(media);
        if (desc) desc.innerHTML = src.innerHTML.trim();
        if (src.parentNode) src.parentNode.removeChild(src);
      }
      if (embed && !embed.querySelector('iframe, video')) { card.classList.add('pv-novideo'); }
      var play = card.querySelector('.pv-play');
      if (play) play.addEventListener('click', function () {
        card.classList.add('pv-playing');
        var f = embed.querySelector('iframe');
        if (f) { var s = f.getAttribute('src') || ''; if (s && s.indexOf('autoplay') === -1) f.setAttribute('src', s + (s.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1'); }
        var v = embed.querySelector('video'); if (v) { v.setAttribute('controls', ''); v.play(); }
      });
    });
  }

  /* ---------- Impact page: build stat grid from a body table (id | name | number) ---------- */
  function initImpactGrid() {
    var src = document.querySelector('.impact-source');
    var grid = document.getElementById('impact-grid');
    if (!src || !grid) return;
    var base = (grid.getAttribute('data-iconbase') || '').split('?')[0].replace(/[^/]*$/, '');
    function txt(c) { return (c.textContent || '').trim(); }
    var rows = src.querySelectorAll('table tr');
    if (rows.length) {
      var html = '';
      Array.prototype.forEach.call(rows, function (tr) {
        var cells = tr.querySelectorAll('td');
        if (cells.length < 2) return; // skip header (th) rows
        var id, name, num;
        if (cells.length >= 3) { id = txt(cells[0]); name = txt(cells[1]); num = txt(cells[2]); }
        else { id = ''; name = txt(cells[0]); num = txt(cells[1]); }
        if (!name || !num) return;
        var icon = (id && base) ? '<span class="ic-stat-icon"><img src="' + base + id + '.png" alt="" loading="lazy"></span>' : '';
        html += '<div class="ic-stat">' + icon + '<span class="num">' + num + '</span><span class="lbl">' + name + '</span></div>';
      });
      if (html) grid.innerHTML = html;
    }
    if (src.parentNode) src.parentNode.removeChild(src);
  }

  /* ---------- Home About "Who We Are" from a post ----------
     Title -> heading, first line -> subtitle, bullets/paragraphs -> points */
  function initAboutSnapshot() {
    var src = document.querySelector('.about-source');
    if (!src) return;
    var lead = document.querySelector('.about-body .lead');
    var pts = document.querySelector('.about-body .about-points');
    var nodes = Array.prototype.slice.call(src.children);
    if (nodes.length && lead) { lead.innerHTML = nodes[0].innerHTML || nodes[0].textContent || ''; }
    var rest = nodes.slice(1);
    var icon = '<span class="ap-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    if (pts) {
      var html = '';
      rest.forEach(function (n) {
        if (n.tagName === 'UL' || n.tagName === 'OL') {
          Array.prototype.forEach.call(n.querySelectorAll('li'), function (li) {
            html += '<div class="about-point">' + icon + '<p>' + li.innerHTML + '</p></div>';
          });
        } else if ((n.textContent || '').trim()) {
          html += '<div class="about-point ap-plain"><p>' + (n.innerHTML || n.textContent) + '</p></div>';
        }
      });
      pts.innerHTML = html;
    }
    src.remove();
  }

  /* ---------- Program pages: split page body ----------     line 1  -> About heading (.prog-about-h)
     line 2  -> About paragraph (.prog-about-p)
     line 3+ -> full-width extra box after focus area (.prog-extra) */
  function initProgramContent() {
    var src = document.querySelector('.prog-source');
    if (!src) return;
    var nodes = Array.prototype.slice.call(src.children);

    var head = document.querySelector('.prog-about-h');
    var text = document.querySelector('.prog-about-p');
    var extra = document.querySelector('.prog-extra');
    var extraBody = document.querySelector('.prog-extra-body');

    if (nodes.length) {
      if (head && nodes[0]) head.textContent = (nodes[0].textContent || '').trim();
      if (text && nodes[1]) { text.innerHTML = ''; text.appendChild(nodes[1]); }
      var rest = nodes.slice(2);
      if (rest.length && extraBody && extra) {
        rest.forEach(function (n) { extraBody.appendChild(n); });
        extra.hidden = false;
      }
    }

    /* If a Ghost gallery card was added in the body, lift its images out of the
       extra box and feed them into the home-style gallery before the Donate CTA. */
    var pg = document.querySelector('.prog-gallery');
    if (pg && extraBody) {
      var galCards = extraBody.querySelectorAll('.kg-gallery-card');
      if (galCards.length) {
        var gsource = pg.querySelector('.gallery-source');
        Array.prototype.forEach.call(galCards, function (card) {
          card.querySelectorAll('img').forEach(function (im) {
            var s = im.getAttribute('src');
            if (s) { var ni = document.createElement('img'); ni.src = s; gsource.appendChild(ni); }
          });
          if (card.parentNode) card.parentNode.removeChild(card);
        });
        pg.hidden = false;
        if (extra && !extraBody.children.length && !extraBody.textContent.trim()) extra.hidden = true;
      }
    }

    if (src.parentNode) src.parentNode.removeChild(src);
  }

  /* ---------- Google Translate floating button ---------- */
  function initLangFab() {
    var fab = document.querySelector('.lang-fab');
    if (!fab) return;
    var btn = fab.querySelector('.lang-fab-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      fab.classList.toggle('open');
    });
    document.addEventListener('click', function () { fab.classList.remove('open'); });
    fab.querySelectorAll('.lang-menu button').forEach(function (b) {
      b.addEventListener('click', function () {
        setLanguage(b.getAttribute('data-lang'));
        fab.classList.remove('open');
        var label = fab.querySelector('.lang-label');
        if (label) label.textContent = b.textContent.trim();
      });
    });
  }

  // sets the google translate cookie + triggers the hidden select
  function setLanguage(lang) {
    function fire() {
      var combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    }
    if (!fire()) {
      // set cookie fallback then reload
      var host = window.location.hostname;
      var val = '/en/' + lang;
      document.cookie = 'googtrans=' + val + ';path=/';
      document.cookie = 'googtrans=' + val + ';domain=.' + host + ';path=/';
      setTimeout(function () { if (!fire()) window.location.reload(); }, 400);
    }
  }

  // Google Translate init (called by external script)
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'kn,hi,en',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  };
})();
