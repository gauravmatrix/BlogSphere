document.addEventListener("DOMContentLoaded", function () {
    console.log("JS File Loaded! ✅");

    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input, textarea, select");
    const saveBtn = document.querySelector(".btn.save-btn");
    let isModified = false; 

    // ✅ Handle Form Submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form Submit Triggered! 🚀");

        let valid = true;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                valid = false;
                input.style.border = "2px solid red";
            } else {
                input.style.border = "";
            }
        });

        let quillContent = quill.root.innerHTML.trim();
        if (quillContent === "<p><br></p>") {
            valid = false;
            showPopupMessage("⚠️ Blog content cannot be empty!", "warning");
        }

        if (!valid) {
            showPopupMessage("⚠️ Fill all fields!", "warning");
            return;
        }

        if (!isModified) {
            showPopupMessage("⚠️ No changes detected!", "warning");
            return;
        }

        // ✅ Custom Confirmation Popup
        showCustomConfirmPopup(() => {
            document.querySelector("#hiddenContent").value = quillContent;
            showPopupMessage("✅ Saving Changes...", "success", () => {
                setTimeout(() => {
                    form.submit();
                }, 2000);
            });
        });
    });

    // ✅ Function to Show Popup Message
    function showPopupMessage(text, type, callback) {
        let message = document.createElement("div");
        message.className = `popup-message ${type}`;
        message.innerText = text;
        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.add("fade-out");
            setTimeout(() => {
                message.remove();
                if (callback) callback();
            }, 5000);
        }, 2000);
    }

    // ✅ Custom Confirmation Modal
    function showCustomConfirmPopup(onConfirm) {
        let confirmBox = document.createElement("div");
        confirmBox.className = "custom-confirm";

        confirmBox.innerHTML = `
            <div class="confirm-content">
                <h3>Are you sure?</h3>
                <p>Do you want to save the changes?</p>
                <button class="confirm-btn yes">Yes</button>
                <button class="confirm-btn no">Cancel</button>
            </div>
        `;

        document.body.appendChild(confirmBox);

        confirmBox.querySelector(".yes").addEventListener("click", function () {
            confirmBox.remove();
            if (onConfirm) onConfirm();
        });

        confirmBox.querySelector(".no").addEventListener("click", function () {
            confirmBox.remove();
        });
    }
});
