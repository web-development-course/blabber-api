function createBlab(blabData) {
  var newBlab = $('' + 
    '<div id="' + blabData.id + '" class="blab-container">' +
      '<div class="blab-image">' +
        '<img src="https://email2pic.herokuapp.com/gravatar/' + blabData.email + '">' +
      '</div>' +
      '<div class="blab-body">' +
        '<div class="blab-email">' + blabData.email + '</div>' +
        '<div class="blab-content">' + blabData.content + '</div>' +
        '<div class="blab-actions">' +
          '<a href="#" class="delete-blab" onclick="deleteBlab(\'' + blabData.id + '\')">delete</a>' +
          '<span> · </span>' +
          '<a href="#" class="upvote-blab" onclick="upvoteBlab(\'' + blabData.id + '\')">upvote (<span class="blab-upvotes">' + blabData.upvotes + '</span>)</a>' +
          '<span> · </span>' +
          '<a>' + blabData.createdAt.toLocaleString() + '</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '');  
  $('#blabs-container').prepend(newBlab);
}

function deleteBlab(blabId) {
  debugger;
  $.ajax({
    url: '/blab/destroy/' + blabId,
    type: 'delete',
    data: $(this).serialize(),
    success: function () {
      $('#' + blabId).remove();
    }
  });
}

function upvoteBlab(blabId) {
  debugger;
  var upvotes = $('#' + blabId).find('.blab-upvotes');
  var upvotesNum = parseInt(upvotes.html());
  $.ajax({
    url: '/blab/update/' + blabId + '?upvotes=' + (upvotesNum + 1),
    type: 'put',
    data: $(this).serialize(),
    success: function (res) {
      upvotes.html(res.upvotes);
    }
  });
}

$(document).ready(function () {

  $.ajax({
    url: '/blab',
    type: 'get',
    success: function (blabs) { 
      $('#blabs-container').html('');
      for (var i = 0; i < blabs.length; i++) {
        createBlab(blabs[i]);
      }
    }
  });


  $('#create-blab').submit(function (e) {
    e.preventDefault();

    $.ajax({
      url: '/blab/create',
      type: 'post',
      data: $(this).serialize(),
      success: function (data) {
        createBlab(data);
      }
    });

  });
});
