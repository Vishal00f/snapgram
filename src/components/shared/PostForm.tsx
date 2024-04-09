import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "./FileUploader"
import { Models } from "appwrite"
import { useAuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useToast } from "../ui/use-toast"
import { useCreatePost, useDeletePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import Loader from "./Loader"

 
const formSchema = z.object({
  caption: z.string().min(2, {
    message: "Caption must be at least 2 characters.",
  }),
  location:z.string().min(2,{message:"location must contain at least 2 characters"}),
  tags:z.string().min(2,{message:"Tags must contain at least 2 characters"}),
  file:z.custom<File[]>(),
})
type PostFormProps = {
  post?:Models.Document;
  action:'Create' | 'Update'
}
function PostForm({post,action}:PostFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          caption: post?post?.caption:"",
          file:[],
          location:post?post?.location:"",
          tags:post?post?.tags.join(','):""
        }
      })
      
     const {toast} = useToast()
      //create post methods 
      const {mutateAsync:createPost,isPending:isLoadingCreate}= useCreatePost()
      const {mutateAsync:updatePost,isPending:isLoadingUpdate} = useUpdatePost()
      const {mutateAsync:deletePost,isPending:isLoadingDelete} = useDeletePost()
      const {user} = useAuthContext()
      const navigate = useNavigate()
      // 2. Define a submit handler.
      
      
      async function onSubmit(values: z.infer<typeof formSchema>) {
        if(post && action==='Update'){
          const updatedPost = await updatePost({
            ...values,
            postId:post.$id,
            imageId:post?.imageId,
            imageUrl:post?.imageUrl
          })
          if(!updatePost) {
             toast({title:'Please try again..'})
          }
          return navigate(`/posts/${post.$id}`)
        }
        const newPost = await createPost({...values,userId:user.id})
        if(!newPost){
          return toast({title:"Please try again"})
        }
          navigate('/')
      }


    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 w-full max-w-5xl">
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Caption</FormLabel>
                  <FormControl>
                    <Textarea className="shad-textarea custom-scrollbar" {...field} />
                  </FormControl>
                  
                  <FormMessage className="shad-form_message"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Photos</FormLabel>
                  <FormControl>
                    <FileUploader 
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                />

                  </FormControl>
                  
                  <FormMessage className="shad-form_message"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Location</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input " {...field} />
                  </FormControl>
                  
                  <FormMessage className="shad-form_message"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Tags seperated by comma " , "</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input " 
                    placeholder="Art, Expression, Learn"
                    {...field} />
                  </FormControl>
                  
                  <FormMessage className="shad-form_message"/>
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">

            <Button type="button" className="shad-button_dark_4">Cancel</Button>
            <Button type="submit" className="shad-button_primary whitespace-nowrap"
               disabled={isLoadingUpdate || isLoadingDelete}
            >
              {isLoadingCreate || isLoadingUpdate && "Loading..."}
              {action} post
            </Button>
            </div>
          </form>
        </Form>
      )
}

export default PostForm