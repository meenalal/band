$(document).ready(function() {

    var search = function() {

       // If the field isn't empty do a search
       if ($("#keyword").val() != ""){
 
          $('.results').removeClass('dice');
          $('.result').removeClass('show');
 
          //clear out old results
          $('.results .inner').empty();
 
 
          if ($("#keyword").val() != ""){
             var userInput = $('#keyword').val();
          }
          else if (dirs != "") {
             var userInput = dirs;
          }
 
          //getJSON
          $.getJSON( "https://venues.cashmusic.org/venues/"+encodeURIComponent(userInput), function( data ) {
 
             if (data.results != "") {
                var items = [];
                $(data.results).each(function (index, item) {
                   finalMarkup = "<div class='result' id='" + item.id + "'><a class='card' href='band/assets/venue/venue.html'><h1>" + item.name + "</h1><div class='address'>";
                   if (item.address1) {
                      finalMarkup += "<p>" + item.address1 + "</p>";
                   }
                   if (item.address2) {
                      finalMarkup += "<p>" + item.address2 + "</p>";
                   }
                   if (item.city) {
                      finalMarkup += "<p>" + item.city + "</p>";
                   }
                   if (item.region) {
                      finalMarkup += "<p>" + item.region + "</p>";
                   }
                   if (item.postalcode) {
                      finalMarkup += "<p>" + item.postalcode + "</p>";
                   }
                   if (item.country) {
                      finalMarkup += "<p>" + item.country + "</p>";
                   }
                   finalMarkup += "</div>";
                   if (item.url) {
                      finalMarkup += "<p class='website'><a target='_blank' href='http://" + item.url + "'>" + item.url + "</a></p>";
                   }
                   finalMarkup += "<p class='uuid'><span class='title'>UUID</span><span class='id'>" + item.UUID + "</span></p></a></div>";
                   $('.results .inner').append(finalMarkup);
                });
 
             } else{
                $('.results .inner').empty();
                $('.results').addClass('dice');
             }
 
             if (!$('#container').hasClass('display')){
                $('#container').addClass('display');
             }
 
             setTimeout(function() {
                $('.result').addClass('show');
             }, 200);
 
          }); //getJSON
 
       } // If you submitted something
 
       else{
          $('body').removeClass('display');
       }
    };
    
    search();
    /* Search Submit */
    $("#search_submission").submit(function(e) {
       e.preventDefault();
    });
 
    /* Inputting Text */
    var keystroketimer = false;
    $('#keyword').on('keyup', function() {
 
       var url_state = "";
       if ($(this).val().length > 2) {
          var url_state = "";
       }
 
       if ($(this).val().length < 3) {
          var url_state = "";
          window.history.replaceState({}, null, "/");
       }
 
       history.pushState(1, null, url_state);
       if ($(this).val().length > 2) {
          keystroketimer = setTimeout(function() {
             search();
             return false;
          }, 150);
       }
    });
 
 
 
    /* Focus outside empty input field */
    $('#keyword').blur(function() {
       if( $(this).val().length === 0 ) {
          $('body').removeClass('display');
       }
    });
 
    /* Sub Page Stuff */
 
    $('.return').click(function(){
       parent.history.back();
       return false;
    });

    var entryreplace = function(){
      
      mu = `<div id="card">
            <div class="front">
              <h1>Walt Disney Concert Hall</h1>
              <div class="inner">
                  <p>111 S. Grand Ave.</p>
                  <p>Los Angeles </p>
                  <p>CA</p>
                  <p>USA</p>
              </div><!--inner-->
              
              <div class="location">
                  Location:
                  <p>Latitude: <strong>34.058872</strong></p>
                  <p>Longitude: <strong>-118.245740</strong></p>
                  <a target="_blank" href="http://maps.google.com/maps?q=34.058872,-118.245740&z=10">View map</a>
              </div><!--location-->
              <p>Creation Date: October 12, 2015</p>
              
              <p class='uuid'><span class='title'>UUID</span><span class='id'>56155870e3626</span></p>
              <p class="code">
                  <strong>API Endpoint: </strong><a href="/venue/56155870e3626">/venue/56155870e3626</a><br />
                  <strong>API Response: </strong> {&quot;UUID&quot;:&quot;56155870e3626&quot;,&quot;name&quot;:&quot;Walt Disney Concert Hall&quot;,&quot;address1&quot;:&quot;111 S. Grand Ave.&quot;,&quot;address2&quot;:null,&quot;city&quot;:&quot;Los Angeles &quot;,&quot;region&quot;:&quot;CA&quot;,&quot;country&quot;:&quot;USA&quot;,&quot;postalcode&quot;:null,&quot;latitude&quot;:&quot;34.058872&quot;,&quot;longitude&quot;:&quot;-118.245740&quot;,&quot;url&quot;:null,&quot;phone&quot;:null,&quot;creationdate&quot;:&quot;October 12, 2015&quot;,&quot;modificationdate&quot;:null,&quot;type&quot;:null,&quot;id&quot;:&quot;3131&quot;}
              </p>
            </div><!--front-->
         </div><!--card-->`;
         $('.entry-container').append(mu);
         $('.inner').parent().child(mu);

    }
 
 
}); // $document