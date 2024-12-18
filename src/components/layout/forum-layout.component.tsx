interface IProps {
  children: React.ReactChild[];
  justify?: string;
}

const ForumPageLayout: React.FC<IProps> = ({ children, justify }) => {
  return (
    <div className="flex forum-layout" style={{ justifyContent: justify }}>
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </div>
  );
};

export default ForumPageLayout;
