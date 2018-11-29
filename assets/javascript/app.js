$(document).ready(function () {

    var hidesearchresult = function () {
        if ($('#container').is(':hidden')) {
            $('#container').show();
        }
        $('.entry-container').empty();
    }

    hidesearchresult();

    var search = function () {

        // If the field isn't empty do a search
        if ($("#keyword").val() != "") {

            $('.results').removeClass('dice');
            $('.result').removeClass('show');

            //clear out old results
            $('.results .inner').empty();


            if ($("#keyword").val() != "") {
                var userInput = $('#keyword').val();
            }
            else if (dirs != "") {
                var userInput = dirs;
            }

            //getJSON
            $.getJSON("https://venues.cashmusic.org/venues/" + encodeURIComponent(userInput), function (data) {

                if (data.results != "") {
                    var items = [];
                    $(data.results).each(function (index, item) {
                        finalMarkup = "<div class='result' id='" + item.id + "'><a class='card' href='#'><h1>" + item.name + "</h1><div class='address'>";
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

                } else {
                    $('.results .inner').empty();
                    $('.results').addClass('dice');
                }

                if (!$('#container').hasClass('display')) {
                    $('#container').addClass('display');
                }

                setTimeout(function () {
                    $('.result').addClass('show');
                }, 200);

            }); //getJSON

        } // If you submitted something

        else {
            $('body').removeClass('display');
        }
    };

    /* Search Submit */
    $("#search_submission").submit(function (e) {
        e.preventDefault();
    });

    /* Inputting Text */
    var keystroketimer = false;
    $('#keyword').on('keyup', function () {

        var url_state = "";
        if ($(this).val().length > 2) {
            var url_state = "";
        }
        /*
        if ($(this).val().length < 3) {
            var url_state = "";
            window.history.replaceState({}, null, "/");
        }
        */
        history.pushState(1, null, url_state);
        if ($(this).val().length > 2) {
            keystroketimer = setTimeout(function () {
                search();
                return false;
            }, 150);
        }
    });

    $('.logo').click(function () { hidesearchresult(); return false; });

    /* Focus outside empty input field */
    $('#keyword').blur(function () {
        if ($(this).val().length === 0) {
            $('body').removeClass('display');
        }
    });

    /* Sub Page Stuff */

    $('.return').click(function () {
        parent.history.back();
        return false;
    });

    var entryreplace = function (ip) {

        $('#container').hide(100);
        mu = `<div id="card">
            <div class="front">
              <h1>{name}</h1>
              <div class="inner">
                  <p>{address1}</p>
                  <p>{city}</p>
                  <p>{region}</p>
                  <p>{country}</p>
              </div><!--inner-->
              
              <div class="location">
                  Location:
                  <p>{latitude}</strong></p>
                  <p>{longitude}</strong></p>
                  <a target="_blank" href="http://maps.google.com/maps?q={latitude},{longitude}&z=10">View map</a>
              </div><!--location-->
              <p>{creationdate}</p>
              
              <p class='uuid'><span class='title'>UUID</span><span class='id'>{UUID}</span></p>
              <p class="code">
                  <strong>API Endpoint: </strong><a href="/venue/{UUID}">/venue/{UUID}</a><br />
                  <strong>API Response: </strong> {api_response}
              </p>
            </div><!--front-->
         </div>`;
        $.getJSON("https://venues.cashmusic.org/venue/" + ip, function (data) {
            if (data.name) {
                mu = mu.replace("{name}", data.name)
            }
            if (data.address1) {
                mu = mu.replace("{address1}", data.address1)
            }
            if (data.address2) {
                mu = mu.replace("{address2}", data.address2)
            }
            if (data.city) {
                mu = mu.replace("{city}", data.city)
            }
            if (data.region) {
                mu = mu.replace("{region}", data.region)
            }
            if (data.country) {
                mu = mu.replace("{country}", data.country)
            }
            if (data.latitude) {
                mu = mu.replace(new RegExp('{latitude}', 'g'), data.latitude)
            }
            if (data.longitude) {
                mu = mu.replace(new RegExp('{longitude}', 'g'), data.longitude)
            }
            if (data.UUID) {
                mu = mu.replace(new RegExp('{UUID}', 'g'), data.UUID)
            }
            if (data.api_response) {
                mu = mu.replace("{api_response}", data.api_response)
            }
            if (data.creationdate) {
                mu = mu.replace("{creationdate}", data.creationdate)
            }
            $('.entry-container').append(mu);
        });
    }

    $('#container').on('click', 'div.result.show', function () {
        entryreplace($(this).find(".uuid .id")[0].innerText);
    });

}); // $document