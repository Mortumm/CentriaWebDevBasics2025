document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Hide the form
            orderForm.style.display = 'none';

            // Show the thank you message
            thankYouMessage.style.display = 'block';
        });
    }
});