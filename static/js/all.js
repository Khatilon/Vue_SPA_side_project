window.onload=function(){
    //https://www.instagram.com/explore/tags/{標籤}
		new Vue({
			el:"#app",
			data:{
				searchItem:"",
				baseUrl:"https://www.instagram.com/explore/tags/",
				realUrl:"",
				pictures:[],
				showImg:"",
                ifShow:false,
                isLoading:false,

			},
			methods: {
				search(){
                    this.isLoading=true;

					this.emptyPicture();

					console.log("yo",this.searchItem);
					this.realUrl=`${this.baseUrl}${encodeURI(this.searchItem)}/?__a=1`;
					console.log(this.realUrl);

					axios.get(this.realUrl)
						.then((res)=>{

							// console.log(this); //由於用箭頭函式,所以仍指在Vue組件內

							let pageInfo=res.data.graphql.hashtag.edge_hashtag_to_media.edges;
							
							// console.log(pageInfo[0].node.display_url);

							pageInfo.forEach(element => {
								this.pictures.push(element.node.thumbnail_src);
							});

                            // console.log(this.pictures);
                            this.isLoading=false;
                            
						}).catch((res)=>{
                            this.isLoading=false;
                            console.log(res);
                            alert("搜尋不到");
						})
				},
				emptyPicture(){
					this.pictures=[];
				},
				imgClick(index){
						//注意!!! 在imgClick的時候 要阻止冒泡事件!!!

						console.log(index);
						console.log(this.pictures[index]);

						document.querySelector(".imgShow").classList.add("show");
						this.showImg=this.pictures[index];
						this.ifShow=true;
						console.log(this.ifShow);
					
				},
				imgRemove(){
					if(this.ifShow){
						//這邊直接將事件綁在#app上面
						document.querySelector(".imgShow").classList.remove("show");
					}
				},
				
			},
		})
}