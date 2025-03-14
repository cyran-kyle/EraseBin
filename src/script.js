document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("uploadBtn");
    const loadingContainer = document.getElementById("loadingContainer");
    const resultDiv = document.getElementById("result");
    const pasteUrl = document.getElementById("pasteUrl");
    const copyBtn = document.getElementById("copyBtn");

    // Initialize particles.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    uploadBtn.addEventListener("click", async () => {
        const content = document.getElementById("pasteContent").value;
        const password = document.getElementById("password").value;
        if (!content) return alert("Paste content cannot be empty!");

        loadingContainer.classList.add("active");
        uploadBtn.disabled = true;

        try {
            const response = await fetch("/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, password }),
            });

            const data = await response.json();
            if (data.url) {
                pasteUrl.value = data.url;
                resultDiv.classList.remove("hidden");
            } else {
                alert(data.error || "Upload failed.");
            }
        } catch (e) {
            alert("Error uploading paste.");
        } finally {
            loadingContainer.classList.remove("active");
            uploadBtn.disabled = false;
        }
    });

    copyBtn.addEventListener("click", () => {
        pasteUrl.select();
        document.execCommand("copy");
        alert("Link copied!");
    });
});
