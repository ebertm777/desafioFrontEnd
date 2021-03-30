function initMap() {

    var iconBase = 'assets/images/EmarcaMapa.png';

    var location = {
        lat: -22.91526,
        lng: -43.18252
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15, center: location
    });

    new google.maps.Marker({
        position: location,
        icon: iconBase,
        map: map
    });

}