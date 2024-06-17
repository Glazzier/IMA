document.addEventListener("DOMContentLoaded", function () {
  // Obtener formulario de apply.html
  const applyForm = document.getElementById("applyForm");

  // Obtener formulario de gd.html
  const gdExamForm = document.getElementById("gdExamForm");

  if (applyForm) {
    applyForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(applyForm);
      const webhookURL =
        "https://discord.com/api/webhooks/1252318119356272691/48gYTey2uc1w-cDrwd1i_ClGgJ7sNAqwSGWjtMQGxt1DuvgdlC6dNqPLqg9u6v1h0Tvo";

      sendEmbedToWebhook(
        formData,
        webhookURL,
        "Aplicación para Moderador",
        "<@631907198930386950>"
      );
    });
  }

  if (gdExamForm) {
    gdExamForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(gdExamForm);
      const webhookURL =
        "https://discord.com/api/webhooks/1252313374507925624/5iY4n5CWTy9Kl6m9tIcL46jejBS3NtoqmGK1zqxeF5dqZy6ng984jSXAV21o6R4ThabP";

      sendEmbedToWebhook(
        formData,
        webhookURL,
        "Respuestas del Examen GD",
        "<@631907198930386950>"
      );
    });
  }

  function sendEmbedToWebhook(formData, webhookURL, title, mention) {
    const embed = {
      title: title,
      description: `${mention}, aquí tienes la información:`,
      fields: [],
    };

    // Construir los campos del embed con las preguntas y respuestas
    formData.forEach((value, key) => {
      embed.fields.push({
        name: key,
        value: value,
        inline: false,
      });
    });

    // Enviar el embed al webhook
    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: mention,
        embeds: [embed],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Información enviada correctamente.");
        formData.forEach((value, key) => formData.delete(key));
      })
      .catch((error) => {
        console.error("Error al enviar la información:", error);
        alert(
          "Hubo un error al enviar la información. Por favor, intenta de nuevo más tarde."
        );
      });
  }
});
