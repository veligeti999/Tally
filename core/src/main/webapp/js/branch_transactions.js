 $(document).ready(function() {
     var response = {};
     $.ajax({
         type: "GET",
         url: "/new-tally/rest/branches/transactions",
         dataType: 'json',
         async: false,
         success: function(result) {
             console.log(result.response_data);
             response.data = result.response_data;
             $('#branch_table').DataTable({
                 "data": response.data,
                 "columns": [
                     { "data": "id" },
                     { "data": "currencyCode" },
                     { "data": "currencyAmount" },
                     { "data": function(data, type, full) { return data.paymentAmount-data.discountAmount; } },
                     { "data": "discountAmount" },
                     { "data": function(data, type, full) { return moment(new Date(data.createdDate)).format("DD-MMM-YY, h:mm:ss a"); } },
                     {
                         "data": function(data, type, full) {
                             if (data.status == "Pending") {
                                 return data.status + '<i class="fa fa-clock-o" data-toggle="tooltip" title="Pending" style="margin-left: 5px"></i>'; //' <img src="images/icons/cancel.png">';
                             } else {
                                 return data.status + '<i class="fa fa-check text-success" data-toggle="tooltip" title="Pending" style="margin-left: 5px"></i>';; //' <img src="images/icons/right.png">';
                             }
                         }
                     },
                     {
                         "data": function(data, type, full) {
                             return '<span style="margin-left: 10px;"><button type="button" class="btn btn-primary mr-2" data-toggle="tooltip" title="View Details" style="cursor: not-allowed">Details</button></span>';
                         }
                     }
                 ]
             });
         }
     });
 });
 
 function init() {
     $.ajax({
         type: "GET",
         url: "/new-tally/rest/branches",
         dataType: 'json',
         async: false,
         success: function(result) {
             console.log(result);
             document.getElementById("branch-name").innerHTML = result.response_data.name;
             document.getElementById("merchant-name-footer").innerHTML = result.response_data.name;
             document.getElementById("manager-name").innerHTML = result.response_data.managerName;
         }
     });
 }
 init();