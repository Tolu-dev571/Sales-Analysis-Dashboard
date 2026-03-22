function calculateSales() {
    let linkedin = parseFloat(document.getElementById("linkedinLeads").value) || 0;
    let email = parseFloat(document.getElementById("emailLeads").value) || 0;
    let referral = parseFloat(document.getElementById("referralLeads").value) || 0;
    let closed = parseFloat(document.getElementById("closedDeals").value) || 0;
    let totalLeads = linkedin + email + referral;

    document.getElementById("totalLeads").innerText = totalLeads;
    document.getElementById("closedDealsDisplay").innerText = closed;

    let conversionRate = 0;
    if (totalLeads > 0) {
        conversionRate = ((closed / totalLeads) * 100).toFixed(1);
    }

    document.getElementById("conversionRate").innerText = conversionRate + "%";

    let revenuePerDeal = 1000;
    let revenue = closed * revenuePerDeal;
    
    document.getElementById("estimatedRevenue").innerText = "$" + revenue.toLocaleString();

    updateChart(linkedin, email, referral);
    updateRevenueChart([revenue], ["Current Month"]);
}

let saleschart;

function updateChart(linkedin, email, referral) {
    const ctx = document.getElementById("salesChart").getContext("2d");

    if (saleschart) {
        saleschart.destroy();
    }

    saleschart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Linkedin Leads", "Email Leads", "Referral Leads"],
            datasets: [{
                label: "Number of Leads",
                data: [linkedin, email, referral],
                backgroundColor: [
                    "#3498db",
                    "#2ecc71",
                    "#f39c12"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May"];
    const revenueData = [1000, 1500, 2000, 2500, 3000];

    updateRevenueChart(revenueData, months); 
});

let revenueChart;

function updateRevenueChart(revenueData, months) {
    const ctxRevenue = document.getElementById("revenueChart").getContext("2d");

    if (revenueChart) {
        revenueChart.destroy();
    }

    revenueChart = new Chart(ctxRevenue, {
        type: "line",
        data: {
            labels: months,    
            datasets: [{
                label: "Revenue Over Time",
                data: revenueData,
                borderColor: "#2ecc71",
                backgroundColor: "rgba(46, 204, 113, 0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
