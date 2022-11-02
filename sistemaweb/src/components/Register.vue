<template>
  <v-row class="register-box">
    <v-col md="5" cols="11" style="height: 65vh; min-height: 500px">
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
          style="padding-top: 25px !important"
          v-model="name"
          label="Nome completo"
          class="register-fields"
          background-color="var(--font-primary)"
          :rules="[rules.required]"
          dense
          outlined
          depressed
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          class="register-fields"
          background-color="var(--font-primary)"
          :rules="[rules.required]"
          dense
          outlined
          depressed
        ></v-text-field>
        <v-text-field
          v-model="phone"
          label="Telefone"
          class="register-fields"
          background-color="var(--font-primary)"
          :rules="[rules.required]"
          dense
          outlined
          depressed
        ></v-text-field>
        <v-text-field
          v-model="telegramId"
          label="Telegram id"
          class="register-fields"
          background-color="var(--font-primary)"
          :rules="[rules.required]"
          dense
          outlined
          depressed
          append-icon="mdi-help-circle-outline"
          @click:append="openTutorial"
        >
        </v-text-field>
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          v-model="password"
          label="Senha"
          class="register-fields"
          background-color="var(--font-primary)"
          dense
          outlined
          depressed
        ></v-text-field>
        <p v-if="!!message && message.length > 1">
          {{ message }}
        </p>
        <v-btn
          :disabled="canSend"
          @click="registerNewUser"
          class="mb-5 px-8"
          color="var(--tertiary)"
          href="#"
          style="height: 36px"
          rounded
          small
          depressed
        >
          <p class="send-register-buttons-text">Enviar</p>
        </v-btn>
      </div>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      md="6"
      cols="11"
      class="d-flex flex-column justify-center"
      style="height: 65vh; min-height: 500px"
    >
      <p class="text-register-family" style="text-align: center">
        Após registrar-se entre em seu aplicativo Telegram e busque por
        @RosterBot, selecione e clique em iniciar.
      </p>
      <p class="text-register-family pt-8 pb-16" style="text-align: center">
        Você irá logar com seu email e senha e assim nossos serviços estarão
        disponíveis para você!
      </p>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: null,
      phone: null,
      telegramId: null,
      password: null,
      email: null,
      message: null,
      show1: false,
      rules: {
        required: (value) => !!value || "Campo necessário.",
        min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
      },
    };
  },
  computed: {
    canSend() {
      if (
        !!this.name &&
        this.name.length > 0 &&
        !!this.email &&
        this.email.length > 0 &&
        !!this.phone &&
        this.phone.length > 0 &&
        !!this.password &&
        this.password.length >= 8
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    openTutorial() {
      window.open("https://www.alphr.com/find-chat-id-telegram/", "_blank");
    },
    async success() {
      this.telegramId = null;
      this.name = null;
      this.password = null;
      this.phone = null;
      this.email = null;
      this.message = "Usuário cadastrado com sucesso!";
      await new Promise((r) => setTimeout(r, 3000));
      this.message = "";
    },
    async registerNewUser() {
      axios
        .post("http://localhost:3030/new-user", {
          telegramId: this.telegramId,
          name: this.name,
          password: this.password,
          phone: this.phone,
          email: this.email,
        })
        .then(async (response) => {
          console.log(response);
          if (response.status >= 200 && response.status < 300) {
            await this.success();
          }
          // axios
          //   .post("http://localhost:9999/callNewUser", { user: response.data })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        })
        .catch((error) => {
          console.log(error);
          this.message = error.response.data.errors[0].message;
        });
    },
  },
};
</script>
<style>
/* .v-input__append-inner {
  margin-top: 0px !important;
} */
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
.text-register-family {
  font-family: "secundary";
  display: block;
  font-style: normal;
  word-break: break-word;
  font-size: 25px;
  line-height: 28px;
  letter-spacing: 0.05em;
  color: var(--font-primary);
}
.register-fields {
  width: 75%;
  max-width: 350px;
  justify-self: center;
  padding-top: 2px !important;
  /* height: 10px; */
}
.send-register-button {
}
.send-register-buttons-text {
  font-family: "appBar";
  font-size: 18px;
  letter-spacing: 0.03em;
  line-height: 20px;
  font-weight: 600;
  color: var(--font-primary);
}
</style>