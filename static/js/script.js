function askAI() {

    // Get question and response elements
    const question = document.getElementById("question").value.trim();
    const response = document.getElementById("response");

    // Check if question is empty
    if (question === "") {
        response.innerHTML = "Please enter your question.";
        return;
    }

    // Show loading message
    response.innerHTML = "Thinking...";

    // Send request to Flask backend
    fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: question
        })
    })

    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
    })

    .then(data => {

        console.log("Response from backend:", data);

        if (data.answer) {
            response.innerHTML = data.answer;
        }
        else if (data.error) {
            response.innerHTML = "Error: " + data.error;
        }
        else {
            response.innerHTML = "Unexpected response from server.";
        }

    })

    .catch(error => {

        console.error("Fetch Error:", error);
        response.innerHTML = "Error connecting to AI backend.";

    });
}