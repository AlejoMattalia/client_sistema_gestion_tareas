import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';

export function Footer() {
  return (
    <section className="p-3 bg-primaryColor w-full flex items-center justify-center md:justify-between">

      <div className="hidden md:block">
        <AssignmentIcon style={{color:"#fff", fontSize:"60px"}}/>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 md:gap-8">
        <p className="text-white font-semibold text-lg">GESTIÓN DE TAREAS</p>

        <section className="flex flex-wrap w-full items-center justify-center gap-3 md:gap-8">
          <div className="flex items-center gap-1">
            <InstagramIcon style={{ color: "#fff" }} />
            <p className="text-white ">@alejomattalia</p>
          </div>

          <div className="flex items-center gap-1">
            <WhatsAppIcon style={{ color: "#fff" }} />
            <p className="text-white md:text-md">3468530707</p>
          </div>

          <div className="flex items-center gap-1">
            <MailOutlineIcon style={{ color: "#fff" }} />
            <p className="text-white md:text-md">alejoomattalia@gmail.com</p>
          </div>
        </section>
      </div>

      <div className="hidden md:block">
        <AssignmentIcon style={{color:"#fff", fontSize:"60px"}}/>
      </div>
    </section>
  )
}
