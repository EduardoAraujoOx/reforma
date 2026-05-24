/* global React, PortalHeader, PortalHero, PillarsOverview, BaseDaReforma,
   EstudosECapacitacao, RadarTesouro, CicloDePalestras, CuradoriaSobre, PortalFooter */

// Full homepage assembly — desktop
function PortalHomeDesktop() {
  return (
    <div style={{ background: "#FAF7F2" }}>
      <PortalHeader active="Início" />
      <PortalHero />
      <PillarsOverview />
      <BaseDaReforma />
      <EstudosECapacitacao />
      <RadarTesouro />
      <CicloDePalestras />
      <CuradoriaSobre />
      <PortalFooter />
    </div>
  );
}

window.PortalHomeDesktop = PortalHomeDesktop;
