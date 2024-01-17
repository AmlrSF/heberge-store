
const { sendEmailTo } = require('../mailer/mailer');
const Domain = require('../schema/domains');



const checkDomainsAndSendEmails = async () => {
    try {
        const domains = await Domain.find().populate({
            path: 'client',
            select: 'name email', // Specify the fields you want to populate
        });
        const currentDate = new Date();

        domains.forEach((domain) => {
            const endDate = new Date(domain.endDate);
            const daysUntilEnd = Math.floor((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
            const emailContent = `
            <div style="font-family: 'Arial', sans-serif; color: #333; padding: 20px;">
                <img src="http://carthage-hosting.carthage-solutions.com/storage/users/3-2022-11-11.png" alt="Carthage Hosting Logo" style="max-width: 100px; margin-bottom: 20px;">
        
                <p>Dear ${domain.client.name},</p>
        
                
        
                <p style="font-size: 20px;color:red">Urgent: Domain Expiry Alert</p>
        
                <p>We wish to inform you that the domain "${domain.domainName}" is set to expire in one month. To ensure uninterrupted service and maintain your online identity, we recommend taking prompt action to renew your domain.</p>
        
                <p>Please consider the following steps:</p>
                <ol>
                    <li>Review the expiration date of your domain "${domain.domainName}".</li>
                    <li>Initiate the renewal process well in advance to avoid any potential disruptions.</li>
                    <li>Verify and update your contact information to receive timely notifications about your domain status.</li>
                </ol>
        
                <p>If you have any questions or require assistance with the renewal process, feel free to reach out to our support team at <a href="mailto:support@carthageHosting.com">support@carthageHosting.com</a>.</p>
        
                <p>Thank you for choosing our services. We appreciate your attention to this matter and value your continued partnership.</p>
        
                <p style="margin-top: 20px;">Best regards,<br>Carthage Hosting</p>
        
                <div style="margin-top: 20px; background-color: #4CAF50; padding: 10px; text-align: center;">
                    <a href="https://localhost:4200/admin" style="text-decoration: none; color: #fff; font-weight: bold; font-size: 16px;">Renew Now</a>
                </div>
            </div>
        `;
        
            if (daysUntilEnd <= 30) {
                sendEmailTo(domain.client.email, 'Urgent: Domain Expiry Alert', emailContent);
            }

            console.log(domain.client.email, daysUntilEnd);
        });
    } catch (error) {
        console.error('Error checking domains and sending emails', error);
    }
};

module.exports = {
    checkDomainsAndSendEmails
}