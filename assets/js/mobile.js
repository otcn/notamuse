/* on mobile: hide address bar / go fullscreen */
window.onload = function() { setTimeout(function() { window.scrollTo(0, 1); }, 0); }

/* the stuff above and the stuff below are doing the same thing i guess, but i am not sure which one i like better yet */

$(document).ready(function() {
  // When ready...
  window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
      // Hide the address bar!
      window.scrollTo(0, 1);
    }, 0);
  });
}); // closing function: "$(document).ready"