$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)


const itemList = $('.list-song .list-item')
const btnPlay = $('.btn-play')
const btnControl = $('.btn-control')
const btnRamdom = $('.btn-ramdom')
const btnRepeat = $('.btn-repeat')
const thumb = $('.left-control .thumb img')
const heading = $('.left-control h4')
const singer = $('.left-control span')
const audio = $('#audio')
const next = $('.btn-control .btn-forward')
const back = $('.btn-control .btn-back')
const range = $('#range')
const timeCurrent = $('.time-current')
const timeDuration = $('.time-duration')
const volume = $('.volume')
const userBtn = $('.user-btn')
const account = $('.account')
const register = $('.account-register')
const modal = $('.modal-register')
const modalContainer = $('.modal-container')

const app = {
    isRepeat: false,
    isRamdom: false,
    isPlaying: false,
    currentIndex: 0,
  songs: [
        {
            name: 'Sau tất cả',
            singer:'Erik',
            image: './asset/thumb song/sau.jpg',
            path: './asset/song/ERIK - SAU TẤT CẢ (Official Audio).mp3',
            album: 'Sau tất cả (Singer)',
            time: '4:52'
        },
        {
            name: 'Đánh mất em',
            singer:'Quang Đăng Trần',
            image: './asset/thumb song/danhmatem.jpg',
            path: './asset/song/ĐÁNH MẤT EM (MV OFFICIAL) - QUANG ĐĂNG TRẦN X ProD. JvN.mp3',
            album: 'Đánh mất em (Singer)',
            time: '4:52'
        },
        {
            name: 'Chỉ muốn bên em lúc này',
            singer:'Huy vạc',
            image: './asset/thumb song/chimuonbenem.jpg',
            path: './asset/song/CHỈ MUỐN BÊN EM LÚC NÀY - JIKI X ft HUY VẠC (FULL MV LYRIC).mp3',
            album: 'Chỉ muốn bên em lúc này (Singer)',
            time: '4:52'
        },
        {
            name: 'Chỉ còn 1 đêm cuối',
            singer:'Tuấn hưng',
            image: './asset/thumb song/demcuoi.jpg',
            path: './asset/song/🆕🎧[Lyrics Video] Chỉ Còn Một Đêm Cuối - Tuấn Hưng.mp3',
            album: 'Chỉ còn 1 đêm cuối (Singer)',
            time: '4:52'

        },
        {
            name: 'Họ yêu ai mất rồi',
            singer:'Doãn Hiếu',
            image: './asset/thumb song/hoyeuaimatroi.jpg',
            path: './asset/song/Họ Yêu Ai Mất Rồi l Doãn Hiếu l Official Lyrics Video.mp3',
            album: 'Họ yêu ai mất rồi (Singer)',
            time: '4:52'

        },
        {
            name: 'Sao em lại tắt máy?',
            singer:'Phạm Ngọc nguyên ft.Vanh',
            image: './asset/thumb song/saoemtatmay.jpg',
            path: './asset/song/SAO EM LẠI TẮT MÁY ! Phạm Nguyên Ngọc ft. VAnh (Original).mp3',
            album: 'Sao em lại tắt máy (Singer)',
            time: '4:52'
        }
    ],

    render: function (){
        
            const html = this.songs.map(function(song, index){
               
                return `
             <div class="select-item ${index === app.currentIndex ? 'active' : ''}" data-index = "${index}" >
                <div class="left-item">
                    <div class="icon-select">
                        <div class="icon-pick">
                            <i class="bi bi-square"></i>
                        </div>
                        <i class="bi bi-music-note-beamed"></i>
                    </div>

                    <div class="thumb-select">
                        <img src="${song.image}" alt="thumb">
                        <div class="icon-thumb">
                            <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif">
                        </div>
                    </div>

                    <div class="name-select">
                            <h4>${song.name}</h4>
                            <span>${song.singer}</span>
                    </div>
                </div>
                
                <div class="mid-item">
                    <div class="album-select">
                        <span>${song.album}</span>
                    </div>

                </div>
               
                <div class="right-item">
                    <div class="time-select">
                        <div class="icon">
                            <i class="bi bi-suit-heart-fill"></i>
                        </div>
                        <span>
                            ${song.time}
                        </span>
                    </div>
                </div>
               
            </div>`
            })
         itemList.innerHTML = html.join('')
        
    },

    handleEvent: function () {
        
        btnPlay.onclick = function () {
            if(app.isPlaying) {
                audio.pause();                 
            }
            else {   
                audio.play();  
            }

          
        }   
       
       
        audio.onplay = function(){
            app.isPlaying = true 
            btnControl.classList.add('playing')  
            app.render()
        },

        audio.onpause = function(){       
            app.isPlaying = false 
            btnControl.classList.remove('playing')
        }

   
     
        btnRamdom.onclick = function () {
            app.isRamdom = !app.isRamdom
            btnRamdom.classList.toggle('active')
        }

        btnRepeat.onclick = function () {
            app.isRepeat  = !app.isRepeat
            btnRepeat.classList.toggle('active')
            console.log(app.isRepeat)
        }
     
        next.onclick = function () {
            if(app.isRamdom){
                app.ramdom()
            } else {
                app.nextsong()   
            }
          
            app.render()
            audio.play() 
        }

        back.onclick = function () {
            app.prevsong()
            audio.play()
        }

        audio.onended = function () {
            if(app.isRepeat) {
                audio.play()
            } 
            else {
                app.nextsong()
                audio.play()
            }
        
          
        }
     
        audio.ontimeupdate = function () {
                
                const rangeTime =
                 Math.floor(audio.currentTime/ audio.duration *100)
                
                if(rangeTime){
                    range.value = rangeTime
                }  
            
            range.oninput = function(e){
                const seaktime = (audio.duration / 100 * e.target.value)
                audio.currentTime = seaktime
            }

            function time (time) {
                const minutes = Math.floor(time / 60)
                const seconds = Math.floor(time - minutes * 60)

                return `0${minutes}:${seconds}`
            }
           
        if(!audio.duration) {
            timeCurrent.textContent = "00:00"
            timeDuration.textContent = "00:00" 
        } else{
            timeDuration.textContent = time(audio.duration)
            timeCurrent.textContent = time(audio.currentTime)
        }
            
        }


        volume.oninput = function (e) {
            audio.volume = e.target.value
        }


    
        itemList.onclick = function (e) {
            const data = e.target.closest('.select-item:not(.active)')
            
          if(data){
              app.currentIndex = Number(data.dataset.index)
              app.render()
              app.loadCurrentSong()
              audio.play()
          }
       
        }

        userBtn.onclick = function(){
            account.classList.toggle('active')
           
        }

        modalContainer.onclick = function(event){
            event.stopPropagation()
        }

        register.onclick = function() {
            modal.classList.add('open')
        }

        modal.onclick = function(){
            modal.classList.remove('open')
        }

    },

    nextsong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevsong: function () {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    ramdom: function () {
            var ramdomIndex
            
            do {
                ramdomIndex = Math.floor(Math.random() * this.songs.length)
            }while(ramdomIndex === this.currentIndex)
            this.currentIndex = ramdomIndex
            this.loadCurrentSong()
            
    },
    // Lấy vị trí bài hát trong array bài hát
    getCurrentSong: function () {
        return this.songs[this.currentIndex]
    },

    // Load bài hát đã lấy
    loadCurrentSong: function (){
        heading.textContent = this.getCurrentSong().name
        singer.textContent = this.getCurrentSong().singer
        thumb.src = this.getCurrentSong().image
        audio.src = this.getCurrentSong().path
          
        


    },

    start: function () {

             this.render()

             this.handleEvent()

             this.getCurrentSong()

             this.loadCurrentSong()
    }



}

app.start();

