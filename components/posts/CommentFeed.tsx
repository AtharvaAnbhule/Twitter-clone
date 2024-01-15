import CommentItem from "./CommentItem";

interface CommentFeedProps {
    comments?:Record<string,any>[];//as array of objects

}

const CommentFeed : React.FC<CommentFeedProps> = ({comments = []}) => {

    return (
        <>

        {comments.map((comment) => (
            <CommentItem key={comment.id} data={comment}/>
        ) 
        )}

        </>
    )
}

export default CommentFeed;