import "../../styles/test.css";
function Test01() {
  //font-size => fontSize
  const style = { color: "blue", fontSize: "30px" };
  return (
    <>
      <div style={style}>test01</div>
      <div style={{ color: "red" }}>test01</div>
      <div id="test_id" className="test">
        test01
      </div>
    </>
  );
}
export default Test01;
