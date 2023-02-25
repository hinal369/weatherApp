$("#search").on('click', (event) => {
    event.preventDefault();
    const city = $("#city_name").val();
    if (city == '' || city == null || city == undefined) {
        $("#setCity").text("Please Enter City Name!");
        $("#setCity").addClass("red-alert");
        hidden();
    } else {
        setData(city);
    }
})

const hidden = () => {
    $("#setDate").hide();
    $("#setTemp").hide();
    $("#setWeather").hide();
    $("#tempMinMax").hide();
    $("#setHumidity").hide();
    $("#humidity").hide();
    $("#setWind").hide();
    $("#wind").hide();
}

const shown = () => {
    $("#setDate").show();
    $("#setTemp").show();
    $("#setWeather").show();
    $("#tempMinMax").show();
    $("#setHumidity").show();
    $("#humidity").show();
    $("#setWind").show();
    $("#wind").show();
}

const setData = (city) => {
    $.ajax({
        url : "/weather",
        type : "post",
        data : {
            "city" : city,
        },
        success: function(result) {
            if (result.cod == 200) {
                shown();
                $("#setCity").removeClass("red-alert");
                $("#setCity").text(`${result.name}, ${result.sys.country}`);
                $("#setDate").text(getCurrentDay());
                $("#setTemp").text(`${Math.round(result.main.temp)}°c`);
                $("#setWeather").text(`${result.weather[0].main}`);
                $("#tempMinMax").text(`${Math.round(result.main.temp_min)}°c / ${Math.round(result.main.temp_max)}°c`);
                $("#setHumidity").text(`${result.main.humidity}%`);
                $("#setWind").text(`${Math.round(result.wind.speed)} km/h`);
            } else {
                $("#setCity").addClass("red-alert");
                $("#setCity").text("City Not Found!");
                hidden();
            }
        }
    })
}

const getCurrentDay = () => {
    const currentTime = new Date();
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = weekDays[currentTime.getDay()] 

    const month = currentTime.getMonth();
    const date = currentTime.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = currentTime.getFullYear()
    const time = `${day} ${date} ${months[month]} ${year}`;
    return time; 
}

$(document).ready(() => {
    setData('surat')
})
