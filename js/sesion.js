hello.init({
  google: '74426412150-gv4r0mjgaat58mvvv56s8dtqb4tpmibd.apps.googleusercontent.com'
});

hello.on('auth.login', function (auth) {

        // add a greeting and access the thumbnail and name from
        // the authorized response

          hello(auth.network).api('/me').then(function (resp) {
                var lab = document.createElement("div");
                lab.id = "pic_and_greet";
                lab.innerHTML = '<img src="' + resp.thumbnail + '" /> Hey ' + resp.name;
                document.body.appendChild(lab);
                });
        });

// remove the greeting when we log out

hello.on('auth.logout', function () {
  var lab = document.getElementById("pic_and_greet");
  if (lab != null) document.body.removeChild( lab );
});

/*
hello.on('auth.login', function(auth) {

    // Call user information, for the given network
    hello(auth.network).api('me').then(function(r) {
      // Inject it into the container
      var label = document.getElementById('profile_' + auth.network);
      if (!label) {
        label = document.createElement('div');
        label.id = 'profile_' + auth.network;
        document.getElementById('profile').appendChild(label);
      }
      label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
    });
  });

*/



  