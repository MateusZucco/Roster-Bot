<template>
  <v-footer
    style="margin-top: 0px; border-top: solid 3px var(--secundary)"
    elevation="0"
    color="var(--primary)"
    dark
    height="320px"
    depressed
  >
    <v-row style=" margin-left:10px; margin-right:10px" class="justify-space-betwee flex">
      <v-col cols="6">
        <p class="font-title">Localizações</p>
        <p class="font-text" style="margin-top:30px; margin-left: 5px">
          <span class="font-bold">Sede Campestre:</span> Rua Coronel Pena de
          Moraes | Farroupilha | RS
        </p>
        <p class="font-text" style="margin-top: 8px; margin-left: 5px">
          <span class="font-bold"> Salão de Eventos:</span> Rua Vêneto, 233 |
          Nova Vicenza | Farroupilha | RS
        </p>
        <p class="font-text" style="margin-top: 25px; margin-left: 5px">
          <span class="font-bold"
            >Atendemos de Seg. a Sex. - das 8 a.m. as 17 p.m.</span
          >
        </p>
      </v-col>
      <v-col cols="6" class="content-buttons">
        <v-row>
          <v-btn
            large
            color="var(--secundary)"
            href="https://www.figma.com/proto/RSd0oQd7bMqYUj5gLK4I5A/Untitled?node-id=2%3A6&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A6"
            target="_blank"
            fab
            depressed
          >
            <font-awesome-icon
              style="font-size: 35px"
              icon="fa-brands fa-whatsapp"
            />
          </v-btn>
          <v-btn
            large
            style="margin-left: 20px"
            color="var(--secundary)"
            href="https://www.instagram.com/clube.santa.rita/"
            target="_blank"
            fab
            depressed
          >
            <font-awesome-icon
              style="font-size: 35px"
              icon="fa-brands fa-instagram"
            />
          </v-btn>
          <v-btn
            large
            style="margin-left: 20px"
            href="https://www.facebook.com/clubesantarita"
            target="_blank"
            color="var(--secundary)"
            fab
            depressed
          >
            <font-awesome-icon
              style="font-size: 35px"
              icon="fa-brands fa-facebook-square"
            />
          </v-btn>
          <v-btn
            large
            href="#"
            style="margin-left: 20px; margin-right: 15px"
            color="var(--secundary)"
            fab
            depressed
          >
            <font-awesome-icon
              style="font-size: 35px"
              icon="fa-solid fa-caret-up"
            />
          </v-btn>
        </v-row>
        <div
          style="
            width: 350px;
            height: 5px;
            border-radius: 15px;
            background: var(--secundary);
            margin-top: 20px;
            margin-bottom: 10px;
          "
        ></div>
        <p class="font-text">Também é possível contatar-nos em</p>
        <p style="margin-top: 8px" class="font-text font-bold">
          contato@email.com.br
        </p>
        <p
          style="margin-top: 8px; text-decoration: underline"
          class="font-text font-bold"
        >
        <a href="tel:+5554991446494">
          (54) 99999-9999
          </a>
        </p>
      </v-col>
    </v-row>
  </v-footer>
</template>
<style>
.content-buttons {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}

.font-text,
.font-title {
  color: var(--font-primary);
  display: block;
  font-style: normal;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.font-text {
  font-family: "tertiary";
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.01em;
}
.font-title {
  font-family: "primary";
  font-size: 32px;
  line-height: 34px;
  font-weight: 800 !important;
  letter-spacing: 0.03em;
}
.font-bold {
  font-weight: 600 !important;
}


.v-application a {
  color: var(--font-primary) !important;
}
a:link {
  color: var(--font-primary);
}

/* visited link */
a:visited {
  color: var(--font-primary);
}

/* mouse over link */
a:hover {
  color: var(--font-primary);
}

/* selected link */
a:active {
  color: var(--font-primary);
}
</style>