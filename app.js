// <<< YEH FINAL, SABSE SIMPLE TEST CODE HAI >>>

// Yeh line check karti hai ki HTML poori load ho gayi hai ya nahi
document.addEventListener('DOMContentLoaded', async () => {
    
    // Is baar hum seedha try-catch istemal karenge
    try {
        // API se data laane ki koshish karo
        const response = await fetch('https://api.quotable.io/random');
        
        // Response ko text me badlo
        const data = await response.json();
        
        // Agar sab theek raha, to screen par ek alert dikhao jismein quote ho
        alert("SUCCESS! Quote mil gaya:\n\n" + data.content);
        
        // Aur body me bhi likh do
        document.body.innerHTML = `<h1>Success!</h1><p>${data.content}</p>`;

    } catch (error) {
        // Agar upar koi bhi gadbad hui, to screen par error wala alert dikhao
        alert("ERROR! Internet se connection nahi ho pa raha.\n\nError Details: " + error.message);
        
        // Aur body me bhi error likh do
        document.body.innerHTML = `<h1>Error</h1><p>Internet se connection nahi ho pa raha. Please apna Wi-Fi badal kar Mobile Data try karein, ya vice-versa.</p>`;
    }

});
