export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_x83aj2f',
    templateId: 'template_eetoq4t',
    contactTemplateId: 'template_t4piw77',
    publicKey: 'UTMnn_JYmng2HjtVm'
  },
  openai: {
    // API calls now go through /api/chat endpoint (no key needed in frontend)
    apiKey: ''
  },
  platform: {
    apiUrl: 'http://localhost:3000/api/external/tickets', // Update this for production!
    apiKey: '41a96e24220343d60fcc2bd9ff722b2f649dc6149a69671546f37f1c4db76e57'
  }
};
