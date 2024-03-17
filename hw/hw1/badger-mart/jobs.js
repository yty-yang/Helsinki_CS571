function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    //  Alert the user of the job that they applied for!
    let jobSelection = document.getElementsByName('job');
    let selected = false;
    for (let job of jobSelection) {
        if (job.checked) {
            alert(`Thank you for applying to be a ${job.value}!`);
            selected = true;
            break;
        }
    }
    if (!selected) {
        alert("Please select a job!");
    }
}