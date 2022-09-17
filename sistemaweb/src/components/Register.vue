<template>
  <v-row class="register-box">
    <v-col cols="5" style="height: 65vh; min-height: 500px">
      <div
        style="
          background: var(--details);
          width: 100%;
          height: 100%;
          border-radius: 25px;
          box-shadow: 14px 14px 15px -4px #0026ff;
          align-items: center;
          display: flex;
          flex-direction: column;
        "
      >
        <p class="title-register-family">Registre-se</p>
        <v-text-field
          v-model="name"
          label="Nome completo"
          class="register-fields"
          background-color="var(--font-primary)"
          hide-details
          dense
          outlined
          depressed
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          class="register-fields"
          background-color="var(--font-primary)"
          hide-details
          dense
          outlined
          depressed
        ></v-text-field>
        <v-text-field
          v-model="phone"
          label="Telefone"
          class="register-fields"
          background-color="var(--font-primary)"
          hide-details
          dense
          outlined
          depressed
        ></v-text-field>
        <v-text-field
          v-model="telegramId"
          label="Telegram id"
          class="register-fields"
          background-color="var(--font-primary)"
          hide-details
          dense
          outlined
          depressed
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          class="register-fields"
          background-color="var(--font-primary)"
          hide-details
          dense
          outlined
          depressed
        ></v-text-field>
        <v-btn
          @click="registerNewUser"
          class="send-register-button"
          href="#"
          style="height: 36px"
          rounded
          outlined
          small
          depressed
        >
          <p class="send-register-buttons-text">Enviar</p>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="7"></v-col>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      phone: "",
      telegramId: "",
      password: "",
      email: "",
    };
  },
  methods: {
    registerNewUser() {
      axios
        .post("http://localhost:3030/new-user", {
          telegramId: this.telegramId,
          name: this.name,
          password: this.password,
          phone: this.phone,
          email: this.email,
        })
        .then(function (response) {
          // console.log(response)
          // axios
          //   .post("http://localhost:9999/callNewUser", { user: response.data })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style>
.register-box {
  max-width: 1520px;
  align-content: center;
  max-height: calc(100vh - 75px);
}
@media screen and (max-width: 1370px) {
  .register-box {
    max-width: 1200px;
  }
}
.title-register-family {
  font-family: "primary";
  display: block;
  font-style: normal;
  font-size: 31px;
  line-height: 34px;
  letter-spacing: 0.01em;
  text-align: center;
  padding-top: 13px;
  color: var(--tertiary);
}
.register-fields {
  width: 75%;
  max-width: 350px;
  justify-self: center;
  padding-top: 25px !important;
  height: 10px;
}
.send-register-button {
  border: 2px solid var(--tertiary);
  background: var(--details);
}
.send-register-buttons-text {
  font-family: "appBar";
  font-size: 18px;
  letter-spacing: 0.03em;
  line-height: 20px;
  font-weight: 600;
  color: var(--tertiary);
}
</style>