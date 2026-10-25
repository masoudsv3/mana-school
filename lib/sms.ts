export async function sendOtp(phone: string) {
  const token = process.env.MELIPAYAMAK_OTP_TOKEN;

  const response = await fetch(`https://console.melipayamak.com/api/send/otp/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to: phone }),
  });

  const data = await response.json();

  if (!data.code) {
    throw new Error("Melipayamak Error: " + JSON.stringify(data));
  }

  return data.code.toString();
}