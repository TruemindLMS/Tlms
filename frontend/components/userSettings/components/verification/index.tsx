import { Lock } from "lucide-react";
import SectionCard from "../sectioncard";
import Toggle from "../toggleswitch";

const Verification = () => {
  return (
    <SectionCard title="Two-Step Verification" icon={Lock}>
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-sm font-medium leading-none">
            Two-Factor Auth
          </p>
          <p className="text-xs mt-0.5">Require code at login</p>
          {/* <Toggle
                  // checked={profile.twoFactor}
                  // onChange={(v) => update("twoFactor", v)}
                // /> */}
        </div>
        <div>
          <p className="text-sm font-medium  leading-none">
            Login Alerts
          </p>
          <p className="text-xs  mt-0.5">Email on new sign-in</p>
          {/* </div> */}
          {/* </div> */}
          {/* <Toggle
                  checked={profile.loginAlert}
                  onChange={(v) => update("loginAlert", v)}
                /> */}
        </div>
      </div>
    </SectionCard>
  );
};

export default Verification;
