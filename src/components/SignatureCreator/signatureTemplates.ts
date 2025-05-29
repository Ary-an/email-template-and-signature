export type SignatureTemplate = (values: {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string;
}) => string;

export const signatureTemplates: Record<string, SignatureTemplate> = {
  corporate: ({ name, title, phone, email, website, logoUrl }) => `
    <div style="font-family: 'Arial', sans-serif; color: #333333; line-height: 1.4; display: flex; align-items: flex-start; gap: 20px;">
      ${
        logoUrl
          ? `<img src="${logoUrl}" alt="Logo" style="height: 50px; width: auto;"/>`
          : ""
      }
      <div>
        <p style="margin: 0; font-weight: bold; font-size: 16px; color: #2c3e50;">${name}</p>
        <p style="margin: 0; font-size: 14px; color: #7f8c8d;">${title}</p>
        <p style="margin: 5px 0 0 0; font-size: 13px;">
          <span style="color: #2c3e50;">Phone:</span> ${phone} | 
          <span style="color: #2c3e50;">Email:</span> <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
        </p>
        ${
          website
            ? `<p style="margin: 3px 0 0 0; font-size: 13px;"><span style="color: #2c3e50;">Web:</span> <a href="${website}" style="color: #3498db; text-decoration: none;" target="_blank">${website}</a></p>`
            : ""
        }
      </div>
    </div>
  `,

  minimalist: ({ name, title, phone, email, website, logoUrl }) => `
    <div style="font-family: 'Helvetica Neue', sans-serif; color: #444; line-height: 1.5; display: flex; gap: 20px;">
      ${
        logoUrl
          ? `<img src="${logoUrl}" alt="Logo" style="height: 60px; width: auto;"/>`
          : ""
      }
      <div style="border-left: 4px solid #3498db; padding-left: 15px;">
        <p style="margin: 0 0 3px 0; font-size: 15px; font-weight: 600;">${name}</p>
        <p style="margin: 0 0 10px 0; font-size: 13px; color: #777;">${title}</p>
        <table style="border-collapse: collapse; font-size: 12px;">
          <tr><td style="padding: 0 10px 0 0; color: #777;">Phone</td><td>${phone}</td></tr>
          <tr><td style="padding: 0 10px 0 0; color: #777;">Email</td><td><a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a></td></tr>
          ${
            website
              ? `<tr><td style="padding: 0 10px 0 0; color: #777;">Web</td><td><a href="${website}" style="color: #3498db; text-decoration: none;" target="_blank">${website}</a></td></tr>`
              : ""
          }
        </table>
      </div>
    </div>
  `,

  creative: ({ name, title, phone, email, website, logoUrl }) => `
    <div style="font-family: 'Segoe UI', Tahoma, sans-serif; display: flex; align-items: center; gap: 20px;">
      ${
        logoUrl
          ? `<img src="${logoUrl}" alt="Company Logo" style="height: 60px; width: auto;"/>`
          : ""
      }
      <div>
        <p style="margin: 0 0 2px 0; font-size: 16px; font-weight: bold; color: #2c3e50;">${name}</p>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #e74c3c; font-weight: 500;">${title}</p>
        <div style="display: flex; gap: 15px; font-size: 12px;">
          <div>
            <p style="margin: 0 0 3px 0; color: #7f8c8d;">Phone</p>
            <p style="margin: 0;">${phone}</p>
          </div>
          <div>
            <p style="margin: 0 0 3px 0; color: #7f8c8d;">Email</p>
            <p style="margin: 0;"><a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a></p>
          </div>
          ${
            website
              ? `<div>
                  <p style="margin: 0 0 3px 0; color: #7f8c8d;">Website</p>
                  <p style="margin: 0;"><a href="${website}" style="color: #3498db; text-decoration: none;" target="_blank">${website}</a></p>
                </div>`
              : ""
          }
        </div>
      </div>
    </div>
  `,

  modern: ({ name, title, phone, email, website, logoUrl }) => `
    <div style="font-family: 'Montserrat', 'Helvetica Neue', sans-serif; color: #333; line-height: 1.6; max-width: 300px;">
      ${
        logoUrl
          ? `<img src="${logoUrl}" alt="Logo" style="height: 36px; width: auto; margin-bottom: 12px; display: block;"/>`
          : ""
      }
      <p style="margin: 0 0 4px 0; font-size: 18px; font-weight: 600; color: #2a2a2a;">${name}</p>
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #5a5a5a; position: relative; display: inline-block;">
        ${title}
        <span style="content: ''; position: absolute; bottom: -6px; left: 0; width: 40px; height: 2px; background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);"></span>
      </p>
      <div style="margin-top: 16px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
            <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19C14.03 20.92 9.07 19.43 5.26 16.63C1.45 13.82 -0.77 9.85 0.18 5.92H3C3.55 5.92 4 6.37 4 6.92V10.92C4 11.47 3.55 11.92 3 11.92H1.32C2.18 15.2 4.8 17.82 8.08 18.68C8.22 18.71 8.36 18.73 8.5 18.73C8.9 18.73 9.28 18.58 9.57 18.31L12.29 15.59C12.68 15.2 13.32 15.2 13.71 15.59L16.43 18.31C16.72 18.58 17.1 18.73 17.5 18.73C17.64 18.73 17.78 18.71 17.92 18.68C19.17 18.41 20.31 17.86 21.29 17.08C21.42 16.97 21.53 16.85 21.63 16.72C21.83 16.49 22 16.22 22 15.92C22 15.41 21.79 15 21.29 15.08C21.69 15.03 22 15.42 22 15.92Z" fill="#6a11cb"/>
          </svg>
          <span style="font-size: 13px;">${phone}</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
            <path d="M4 7L10.94 11.34C11.59 11.72 12.41 11.72 13.06 11.34L20 7M5 18H19C20.1 18 21 17.1 21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18Z" stroke="#6a11cb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <a href="mailto:${email}" style="font-size: 13px; color: #2575fc; text-decoration: none;">${email}</a>
        </div>
        ${
          website
            ? `<div style="display: flex; align-items: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#6a11cb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 12H21M12 3C14.5013 5.73835 15.9228 9.29203 16 13C15.9228 16.708 14.5013 20.2616 12 23C9.49872 20.2616 8.07725 16.708 8 13C8.07725 9.29203 9.49872 5.73835 12 3Z" stroke="#6a11cb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="${website}" style="font-size: 13px; color: #2575fc; text-decoration: none;" target="_blank">${website}</a>
              </div>`
            : ""
        }
      </div>
    </div>
  `,
};
