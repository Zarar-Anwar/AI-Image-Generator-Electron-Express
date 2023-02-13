const {Configuration,OpenAIApi}=require("openai")

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})
const openai=new OpenAIApi(configuration)

class controller{
    static generateImage=async(req,res)=>{
        const {prompt}=req.body
        const imageSize="256x256"
        try {
      const response=await openai.createImage({
        prompt,
        n:1,
        size:imageSize
      })
      const imageUrl=response.data.data[0].url
      res.status(200).json({
        success:"true",
        data:imageUrl
      })
    } catch (error) {
        if(error.response){
            console.log(error.response.status)
            console.log(error.response.data)
        }else{
            console.log(error.message)
        }
        res.status(400).json({
          success:"false",
          error:"Image can not be Created"
        })
      }
    }
}

module.exports=controller