async function sendEmail(to, message) {
    console.log(`Sending email to ${to}: ${message}`); // Replace with actual email sending logic
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000); // Simulate email sending delay
    });
}

export default sendEmail;