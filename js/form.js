window.onload = function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('emailAddress').value;

        // Use HubSpot form loader to submit the data
        hbspt.forms.create({
            portalId: "49164766",
            formId: "76d467f4-578b-47d1-84f8-7abae3798818",
            onFormReady: function (formElement) {
                // Access the form using `formElement`
                formElement.querySelector('input[name="email"]').value = email;

                // Submit the form
                formElement.submit();
            },
            onFormSubmitted: function () {
                console.log("Form successfully submitted!");
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('errorMessage').style.display = 'none';
            }
        });
    });
};