$(document).ready(function() {
  $("#buy").click(function(e) {
    e.preventDefault();
    request("https://sandbox-app.vindi.com.br/api/v1/public/payment_profiles", "post", { 
      Authorization: "Basic Z3pGQkxtU09nYTNkV05VQ0NNbTlxNjN6a1FLaXdHc0RFNjBPbENoRDZWTTo="
    },
    {
      "holder_name": $("#card-name").val(),
      "card_expiration": $("#cc-expiration").val(),
      "card_number": $("#cc-number").val(),
      "card_cvv":  $("#cc-cvv").val(),
      "payment_method_code": "credit_card",
      "payment_company_code": "mastercard"
    }
    )
    .then(res => { 
      if(res.status !== '200') {
       alert('algo deu errado');
        }
    }).catch(function(e) {
        alert(e)
    })
    .then(function(res1) {
      request("https://chimera-api.obviostaging.com.br/api/v1/customers", "post",null, 
      {
        "name": $("#name").val(),
        "correlationId": "123deOliveira4",
        "email": $("#email").val(),
        "registryNumber": "03499243000104",
        "registryType": "COMPANY",
        "address": {
          "street": $("#street").val(),
          "number": $("#address-number").val(),
          "complement": $("#complement").val(),
          "neighborhood": "OSASCO",
          "zipcode": $("#zipcode").val(),
          "city":$("#city").val(),
          "country": "BR",
          "state": $("#state").val(),
        },
        "phones": [
          {
            "type": "MOBILE",
            "number": $("#phone-number").val(),
          }
        ]
      })
      .then(res => { 
        if(res.status == '200') {
         alert('algo deu errado');
          }
      }).catch(function(e) {
          alert(e)
      })
      .then(function(res2) {
        request("https://chimera-api.obviostaging.com.br/api/v1/subscriptions", "post",null,
        {
          "customerId": res2.id,
          "planId": "5ea365cc6dce2a1f884d5ddb",
          "gateway": "VINDI",
          "cards": [
            {
              "token": res1.gateway_token,
            }	
          ]
        })
      })
      .then(res => { 
        if(res.status !== '200') {
         alert('algo deu errado');
          }
      }).catch(function(e) {
          alert(e)
      })
    })
  });
});

var request = function(url, type, headers, body) {
  return fetch(url, {
    method : type,
    headers : {
      'Content-Type': 'application/json',
      ...headers
    },
    body : JSON.stringify(body),
  }).then(response => response.json());
}
