// Smooth scroll and section animation
$(document).ready(function() {
  // Smooth scroll for nav links
  $('a[href^="#"]').on('click', function(e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 60
      }, 900, 'swing');
    }
  });

  // Animate sections on scroll
  function animateOnScroll() {
    $('.section, .lead-section, .project-detail, .blog-post, .post-item').each(function() {
      var elem = $(this);
      var pos = elem.offset().top;
      var winTop = $(window).scrollTop();
      var winHeight = $(window).height();
      if (pos < winTop + winHeight - 80) {
        elem.addClass('visible');
      }
    });
  }
  $(window).on('scroll resize', animateOnScroll);
  animateOnScroll();
});

// Add fade-in effect for visible sections
var style = document.createElement('style');
style.innerHTML = `.section, .lead-section, .project-detail, .blog-post, .post-item {opacity:0;transform:translateY(40px);transition:all 0.7s cubic-bezier(.4,0,.2,1);}
.section.visible, .lead-section.visible, .project-detail.visible, .blog-post.visible, .post-item.visible {opacity:1;transform:none;}`;
document.head.appendChild(style);
