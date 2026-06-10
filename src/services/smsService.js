const API_URL = 'https://api.useombala.ao/v1/messages';

function getConfig() {
  const token = process.env.OMBALA_API_TOKEN;
  const sender = process.env.OMBALA_SENDER;

  if (!token || !sender) {
    console.warn('SMS não configurado: OMBALA_API_TOKEN ou OMBALA_SENDER ausentes');
    return null;
  }

  return { token, sender };
}

function formatPhone(phone) {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('244')) cleaned = cleaned.slice(3);
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  return cleaned;
}

async function sendSms(phone, message) {
  const config = getConfig();
  if (!config) return false;

  const to = formatPhone(phone);

  if (!to || to.length < 9) {
    console.warn('SMS não enviado: número de telefone inválido', phone);
    return false;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${config.token}`,
      },
      body: JSON.stringify({
        message,
        from: config.sender,
        to,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Erro ao enviar SMS (${response.status}):`, errorData);
      return false;
    }

    console.log(`SMS enviado para ${to}: "${message.substring(0, 50)}..."`);
    return true;
  } catch (err) {
    console.error('Erro na requisição SMS:', err.message);
    return false;
  }
}

async function sendAppointmentConfirmation(appointment, user, service, department) {
  const dateObj = new Date(appointment.date + 'T' + appointment.time);
  const dateFormatted = dateObj.toISOString().slice(0, 10).split('-').reverse().join('/');
  const timeFormatted = appointment.time.slice(0, 5);

  const message = `Olá ${user.name}, o seu agendamento para ${service.name} no ${department.name} foi confirmado para ${dateFormatted} às ${timeFormatted}. ID: ${appointment.id}. Obrigado!`;

  return sendSms(user.phone, message);
}

module.exports = { sendSms, sendAppointmentConfirmation };