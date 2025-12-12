document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const resetButton = document.querySelector('button[type="reset"]');

    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Hide the form
            orderForm.style.display = 'none';

            // Show the thank you message
            thankYouMessage.style.display = 'block';
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', function() {
            orderForm.reset();
            // Also hide the thank you message and show the form if it was submitted
            thankYouMessage.style.display = 'none';
            orderForm.style.display = 'block';
        });
    }
});
