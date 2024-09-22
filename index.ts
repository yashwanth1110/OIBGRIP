<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <style>
        /* CSS styles remain unchanged */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            overflow: hidden; /* Prevent scrolling of the main page */
        }
        .container {
            position: fixed;
            top: 0;
            right: -500px; /* Start off the screen */
            width: 500px;
            height: 100%; /* Full height */
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            animation: slideIn 0.5s forwards; /* Animation */
        }
        @keyframes slideIn {
            to {
                right: 0; /* Move to the visible area */
            }
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        .profile-detail {
            margin-bottom: 15px;
        }
        .profile-label {
            font-weight: bold;
        }
        .profile-value {
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 4px;
            background-color: #f9f9f9;
            display: inline-block; /* Keeps the value in the box */
            width: calc(100% - 22px); /* Adjust width to fit */
            box-sizing: border-box; /* Ensure padding is included in width */
        }
        .address-item {
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 5px;
            border-radius: 4px;
            background-color: #f9f9f9;
            cursor: pointer; /* Indicate that it can be interacted with */
        }
        .button {
            background-color: #1b47be;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            display: inline-block;
            margin-top: 10px;
        }
        .close-mark {
            color: #181515; /* Close mark color */
            font-size: 24px;
            float: right;
            cursor: pointer;
        }
        .modal {
            display: none; /* Hidden by default */
            position: fixed; 
            z-index: 1; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.4); 
            padding-top: 60px;
        }
        .modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 400px;
            max-height: 80%; /* Limit the height of the modal content */
            overflow-y: auto; /* Enable vertical scrolling */
        }
        textarea, input[type="text"], input[type="email"] {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            box-sizing: border-box; /* Ensure padding is included in the width */
        }
        select {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            height: 40px; /* Fixed height for the select dropdown */
            box-sizing: border-box; /* Ensure padding is included in the width */
        }
    </style>
</head>
<body>

<div class="container" id="profileContainer">
    <span class="close-mark" id="closeProfileBtn">&times;</span> <!-- Close X Mark -->
    <h2>User Profile</h2>

    <div class="profile-detail">
        <span class="profile-label">Username:</span>
        <span class="profile-value" id="username">JohnDoe</span>
    </div>

    <div class="profile-detail">
        <span class="profile-label">Email:</span>
        <span class="profile-value" id="email">johndoe@example.com</span>
    </div>

    <div class="profile-detail">
        <span class="profile-label">Mobile Number:</span>
        <span class="profile-value" id="mobile_number">123-456-7890</span>
    </div>

    <div class="profile-detail">
        <span class="profile-label">Addresses:</span>
        <div id="addressList" class="address-list">
            <div class="address-item" onclick="selectAddress(this)">123 Main St, Apt 4B, Anytown, CA, 90210, USA</div>
        </div>
        <button class="button" id="addAddressBtn">Add New Address</button>
        <button class="button" id="editInfoBtn">Edit Whole Info</button>
    </div>

    <!-- Modal for Adding New Address -->
    <div id="addAddressModal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeAddModal">&times;</span>
            <h2>Add New Address</h2>
            <form id="addAddressForm">
                <label for="new_address">Address:</label>
                <textarea id="new_address" required></textarea>
                <button type="submit" class="button">Save Address</button>
            </form>
        </div>
    </div>

    <!-- Modal for Editing Whole Info -->
    <div id="editInfoModal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeEditInfoModal">&times;</span>
            <h2>Edit Profile Info</h2>
            <label for="edit_username">Username:</label>
            <input type="text" id="edit_username" required>
            <label for="edit_email">Email:</label>
            <input type="email" id="edit_email" required>
            <label for="edit_mobile_number">Mobile Number:</label>
            <input type="text" id="edit_mobile_number" required>
            <label for="addressSelect">Select Address to Edit:</label>
            <select id="addressSelect" onchange="populateEditAddress()">
                <option value="">Select an address</option>
            </select>
            <label for="edit_address">New Address:</label>
            <textarea id="edit_address" required></textarea>
            <button class="button" id="saveInfoBtn">Save Info</button>
        </div>
    </div>
</div>

<script>
    interface Address {
        id: number;
        value: string;
    }

    const addresses: Address[] = [
        { id: 0, value: "123 Main St, Apt 4B, Anytown, CA, 90210, USA" }
    ]; // Initialize with default address

    const addModal = document.getElementById("addAddressModal") as HTMLElement;
    const editInfoModal = document.getElementById("editInfoModal") as HTMLElement;
    const addBtn = document.getElementById("addAddressBtn") as HTMLElement;
    const editInfoBtn = document.getElementById("editInfoBtn") as HTMLElement;
    const closeAddModal = document.getElementById("closeAddModal") as HTMLElement;
    const closeEditInfoModal = document.getElementById("closeEditInfoModal") as HTMLElement;
    const saveInfoBtn = document.getElementById("saveInfoBtn") as HTMLElement;
    const profileContainer = document.getElementById("profileContainer") as HTMLElement;
    const closeProfileBtn = document.getElementById("closeProfileBtn") as HTMLElement;
    const addressSelect = document.getElementById("addressSelect") as HTMLSelectElement;

    // Close the profile container
    closeProfileBtn.onclick = () => {
        profileContainer.style.display = "none"; // Hide the profile container
    };

    // Open the modal when the add new address button is clicked
    addBtn.onclick = () => {
        addModal.style.display = "block";
        (document.getElementById("new_address") as HTMLTextAreaElement).value = ''; // Clear the textarea for new input
    }

    // Open the modal when the edit whole info button is clicked
    editInfoBtn.onclick = () => {
        (document.getElementById("edit_username") as HTMLInputElement).value = (document.getElementById("username") as HTMLElement).innerText;
        (document.getElementById("edit_email") as HTMLInputElement).value = (document.getElementById("email") as HTMLElement).innerText;
        (document.getElementById("edit_mobile_number") as HTMLInputElement).value = (document.getElementById("mobile_number") as HTMLElement).innerText;
        populateAddressSelect(); // Populate the address select dropdown
        editInfoModal.style.display = "block";
    }

    // Close the modal when the x is clicked
    closeAddModal.onclick = () => {
        addModal.style.display = "none";
    }
    closeEditInfoModal.onclick = () => {
        editInfoModal.style.display = "none";
    }

    // Close the modal when clicking outside of it
    window.onclick = (event: MouseEvent) => {
        if (event.target === addModal) {
            addModal.style.display = "none";
        } else if (event.target === editInfoModal) {
            editInfoModal.style.display = "none";
        }
    }

    // Populate address select dropdown
    function populateAddressSelect(): void {
        addressSelect.innerHTML = '<option value="">Select an address</option>'; // Clear existing options
        addresses.forEach(address => {
            const option = document.createElement("option");
            option.value = address.id.toString();
            option.textContent = address.value;
            addressSelect.appendChild(option);
        });
    }

    // Populate the edit address field based on selected address
    function populateEditAddress(): void {
        const selectedIndex = parseInt(addressSelect.value);
        if (!isNaN(selectedIndex)) {
            (document.getElementById("edit_address") as HTMLTextAreaElement).value = addresses[selectedIndex].value;
        } else {
            (document.getElementById("edit_address") as HTMLTextAreaElement).value = '';
        }
    }

    // Handle form submission for adding new address
    (document.getElementById("addAddressForm") as HTMLFormElement).onsubmit = (event: Event) => {
        event.preventDefault(); // Prevent default form submission

        // Add new address to the array and display it
        const newAddress = (document.getElementById("new_address") as HTMLTextAreaElement).value;
        const newAddressId = addresses.length; // Create a new ID
        addresses.push({ id: newAddressId, value: newAddress });
        
        // Create a new address item
        const newAddressDiv = document.createElement("div");
        newAddressDiv.classList.add("address-item");
        newAddressDiv.innerText = newAddress;

        // Append the new address to the address list
        document.getElementById("addressList")?.appendChild(newAddressDiv);

        addModal.style.display = "none"; // Close the modal
    }

    // Handle save profile info
    saveInfoBtn.onclick = () => {
        (document.getElementById("username") as HTMLElement).innerText = (document.getElementById("edit_username") as HTMLInputElement).value;
        (document.getElementById("email") as HTMLElement).innerText = (document.getElementById("edit_email") as HTMLInputElement).value;
        (document.getElementById("mobile_number") as HTMLElement).innerText = (document.getElementById("edit_mobile_number") as HTMLInputElement).value;

        const selectedIndex = parseInt(addressSelect.value);
        if (!isNaN(selectedIndex)) {
            addresses[selectedIndex].value = (document.getElementById("edit_address") as HTMLTextAreaElement).value; // Update the address
        }

        // Refresh address list
        const addressList = document.getElementById("addressList") as HTMLElement;
        addressList.innerHTML = ''; // Clear current list
        addresses.forEach(address => {
            const addressDiv = document.createElement("div");
            addressDiv.classList.add("address-item");
            addressDiv.innerText = address.value;
            addressList.appendChild(addressDiv);
        });

        editInfoModal.style.display = "none"; // Close the modal
    }
</script>

</body>
</html>
