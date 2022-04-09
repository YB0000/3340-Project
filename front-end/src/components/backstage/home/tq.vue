<template>
  <div>
    <div>
      <div style="text-align: center; font-size: 25px">
        Current City: {{ data.province }} - {{ data.city }}
      </div>
    </div>
    <div>
      <div
        style="font-size: 20px; margin-left: 25%; margin-top: 30px; float: left"
      >
        <img :src="imgUrl" alt="" />
        <br />
        <br />
       Current weather conditions: {{ data.weather }}
      </div>
      <div style="float: left; margin-top: 60px; margin-left: 10%">
        <img
          src="http://localhost:8080/images/wendu.png"
          width="50px"
          height="50px"
          alt=""
        />
        <p style="margin-left: 60px; margin-top: -40px">
          Current Temperature: {{ data.temperature }}℃
        </p>
        <img
          src="http://localhost:8080/images/fengxiang.png"
          alt=""
          width="50px"
          height="50px"
          style="margin-top: 30px"
        />
        <p style="margin-left: 60px; margin-top: -40px">
          Current wind direction:{{ data.winddirection }} 风力: {{ data.windpower }}
        </p>
        <img
          src="http://localhost:8080/images/time.png"
          alt=""
          width="50px"
          height="50px"
          style="margin-top: 30px"
        />
        <p style="margin-left: 60px; margin-top: -40px">
          Data update time:{{ data.reporttime }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
import axios from "axios";
export default {
  data() {
    return {
      data: {
        province: "",
        weather: "",
        temperature: "",
        winddirection: "",
        windpower: "",
        reporttime: "",
      },
      imgUrl: "",
    };
  },
  mounted() {
    this.getData();
  },
  beforeRouteEnter(to, from, next) {
    // ...
    //console.log("Enter")

    if (sessionStorage.getItem("admin") == null) {
      router.push("/home");
    }

    document.title = "Front admin";
    next();
  },
  methods: {
    getData() {
          fetch(
            `https://restapi.amap.com/v3/weather/weatherInfo?city=150100&key=6c261eeb6e5feac4149c9d2209a79f26`,
            {
              method: "get",
            }
          ).then(async (res) => {
            res = await res.json();
            if (res.count == "1") {
              this.data = res.lives[0];
              var weather = this.data.weather;
              setDataFromAxios(`/api/getTqUrl/${weather}`, "get").then(
                (res) => {
                  this.imgUrl = res.imgUrl;
                }
              );
        }
      });
    },
  },
};
</script>
