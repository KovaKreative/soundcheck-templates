$(document).ready(function() {

  // Initialize Page

  const $page = $('.page');
  $page.hide();

  // Set default page
  let $currentPage = $(`#home`);

  $($currentPage).show();

  function setPage(page) {
    if ($currentPage.attr('id') === page) {
      return;
    }
    $currentPage.fadeOut(200, function() {
      $currentPage = $(`#${page}`);
      $currentPage.fadeIn(400, () => {
        $('html, body').animate({
          scrollTop: $currentPage.offset().top
        }, 300);
      });
    });
  }

  // Music functions

  let placeHolderPlaylist = [];

  placeHolderPlaylist.push({
    id: placeHolderPlaylist.length,
    title: `Song Title ${placeHolderPlaylist.length}`,
    fileName: `https://soundcheckstor.blob.core.windows.net/audio/att-band-62-e7c7225c-ad8d-4077-8bdd-3264436dbaf2-20220720-0159325904.mp3`,
    albumArt: `https://soundcheckstor.blob.core.windows.net/images/att-band-62-a95456d2-043a-4fad-a144-043e463befb9-20221214-0805046694.jpg`
  });
  placeHolderPlaylist.push({
    id: placeHolderPlaylist.length,
    title: `Song Title ${placeHolderPlaylist.length}`,
    fileName: `https://soundcheckstor.blob.core.windows.net/audio/att-band-62-2ebbcae1-068e-4f80-a3ec-22b075d5e8d8-20220720-0202471798.mp3`,
    albumArt: `https://soundcheckstor.blob.core.windows.net/images/att-band-62-ab19ee7a-5b55-46d7-83fd-61a5f209e2b8-20221223-0245462647.jpg`
  });
  placeHolderPlaylist.push({
    id: placeHolderPlaylist.length,
    title: `Song Title ${placeHolderPlaylist.length}`,
    fileName: `https://soundcheckstor.blob.core.windows.net/audio/att-band-62-6f48fd98-aefa-4a2e-bc01-e46f92b15b04-20220620-0555184077.wav`,
    albumArt: `https://soundcheckstor.blob.core.windows.net/images/att-band-62-10ec8087-8ad6-4a40-9cdf-09b63f003272-20221214-0805484786.jpg`
  });
  placeHolderPlaylist.push({
    id: placeHolderPlaylist.length,
    title: `Song Title ${placeHolderPlaylist.length}`,
    fileName: `https://soundcheckstor.blob.core.windows.net/audio/att-band-62-b60613f5-a47a-4651-9072-3b588d65e9ba-20230103-1135249452.mp3`,
    albumArt: `https://soundcheckstor.blob.core.windows.net/images/att-band-62-8ab1f206-3d4b-4dc6-a4ea-58a0694bfd8f-20221223-0246060203.jpg`
  });
  placeHolderPlaylist.push({
    id: placeHolderPlaylist.length,
    title: `Song Title ${placeHolderPlaylist.length}`,
    fileName: `https://soundcheckstor.blob.core.windows.net/audio/att-band-62-652ada70-38fa-47cf-9ea3-ef06c50bf0dd-20220720-0213168694.mp3`,
    albumArt: `https://soundcheckstor.blob.core.windows.net/images/att-band-62-53dc7961-8e03-4039-a925-653ee8401e25-20221223-0246168062.jpg`
  });

  // Initialize playlist

  const trackElements = placeHolderPlaylist.map(track => {
    const song = document.createElement('li');
    song.className = "song";
    song.innerHTML = track.title;
    song.setAttribute('data-art', track.albumArt);
    song.setAttribute('data-src', track.fileName);
    return song;
  });
  $('#track-list').append(trackElements);

  const $songTitle = $("#song-title");
  const $albumArt = $("#album-art");
  const $audio = $("#audio-player");
  const $song = $(".song");

  $song.on('click', function(e) {
    const song = e.target;
    $audio[0].pause();
    $song.removeClass('playing');
    $(e.target).addClass('playing');
    $songTitle.html(`${song.innerHTML}`);
    $albumArt.attr('src', song.getAttribute('data-art'));
    $audio.find('source').attr('src', song.getAttribute('data-src'));
    $audio[0].load();
    $audio[0].oncanplaythrough = $audio[0].play();
  });

  const queueFirstSong = function(playlist) {
    $($song[0]).addClass('playing');
    $songTitle.html(`${$song[0].innerHTML}`);
    $albumArt.attr('src', $song[0].getAttribute('data-art'));
    $audio.find('source').attr('src', $song[0].getAttribute('data-src'));
    $audio[0].load();
  };

  queueFirstSong(placeHolderPlaylist);


  // Video Functions
  const youtubeLinks = [];

  youtubeLinks.push({
    title: "Video Title",
    url: "https://www.youtube.com/watch?v=hhpOwuw-BsQ",
    caption: "Our newest video, ain't it spiffy?"
  });
  youtubeLinks.push({
    title: "Video Title",
    url: "https://www.youtube.com/watch?v=DP6ds12t0tg",
    caption: ""
  });
  youtubeLinks.push({
    title: "Video Title",
    url: "https://www.youtube.com/watch?v=hhpOwuw-BsQ",
    caption: "This video sucks!"
  });
  youtubeLinks.push({
    title: "Video Title",
    url: "https://www.youtube.com/watch?v=DP6ds12t0tg",
    caption: "What even is this?"
  });

  const videoListElements = youtubeLinks.map(video => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'video-link';
    link.setAttribute('data-title', video.title);
    link.setAttribute('data-video', video.url);
    link.setAttribute('data-caption', video.caption);
    link.innerHTML = video.title;

    listItem.append(link);
    return listItem;
  });
  // console.log(videoListElements);
  $('#video-list').html(videoListElements);

  const $videoLinks = $(".video-link");

  const setVideo = function(videoObject) {
    const { title, url, caption } = videoObject;
    const youTubeEmbed = 'https://www.youtube.com/embed/';
    const videoIndex = url.search('v=');
    const params = url.slice(videoIndex + 2);
    const endOfVideoIndex = params.search('&');
    let videoId = params;

    if (endOfVideoIndex >= 0) {
      videoId = params.slice(0, endOfVideoIndex);
    }

    $('#video-title').html(title);
    $('#youtube-embed').attr('src', youTubeEmbed + videoId);
    $('#video-caption').html(caption);
  };

  setVideo(youtubeLinks[0]);

  $videoLinks.on('click', e => {
    const title = e.target.getAttribute('data-title');
    const url = e.target.getAttribute('data-video');
    const caption = e.target.getAttribute('data-caption');

    setVideo({ title, url, caption });

  });

  // Menu options
  const $menuItem = $(".menu-item");

  $menuItem.on('click', function(event) {
    // Activate the button
    $menuItem.removeClass('active');
    $(event.target).addClass('active');

    // Switch page
    const page = $(event.target).attr('data-page');
    setPage(page);
  });

  // Photo functions
  const $photo = $(".photo");
  const $imageViewer = $("#image-viewer");

  $photo.on('click', event => {
    $this = $(event.target).addClass('active');
    $imageViewer.find('img').attr('src', event.target.getAttribute('src'));
    $imageViewer.show();
  });
  $imageViewer.on('click', event => {
    $imageViewer.hide();
    $photo.removeClass('active');
  });

});