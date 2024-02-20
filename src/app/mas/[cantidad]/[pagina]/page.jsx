
import Header from "@/componentes/header";
import Main from "@/componentes/main";

export default function Leerid({params}) {
 
  return (
    <>
      <Header tipoEstilo={'styles1'}/>
      <Main params={params} />
    </>
  );
}
