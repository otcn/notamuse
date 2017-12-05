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