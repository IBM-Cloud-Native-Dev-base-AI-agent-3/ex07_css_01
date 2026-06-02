import StyledButton from "./common/StyleButton";
import StyleForm from "./common/StyleForm";
import StyledInput from "./common/StyleInput";
import { ProductTitle } from "./common/StyleProduct";

const ModifyCom = ({username, password, role, onChange, onSubmit}) => {
    return(<>
        <ProductTitle>수정페이지</ProductTitle>
        <StyleForm onSubmit={onSubmit} width="30%">
            <StyledInput name="username" value={username} readOnly/>
            <StyledInput name="password" value={password} onChange={onChange} />
            <StyledInput name="role" value={role} onChange={onChange} />
            <StyledButton>수정</StyledButton>
        </StyleForm>
    </>)
}
export default ModifyCom;