// Brand diagram (§11): 2px lines, square nodes, square caps and mitred
// joins, Inter labels, and the coral dot for the outcome. The vessel is
// the brand mark's own U (scaled 2×), so the scattered parts of a
// business resolve into the logo idea: the system holds the customer.
const NODES = [
  "Spreadsheets",
  "Endless messages",
  "Manual processes",
  "Scattered information",
  "Disconnected tools",
];

const NODE_W = 196;
const NODE_H = 48;
const NODE_GAP = 28;
const BUS_X = 268;
const U_X = 380;
const U_Y = 236;
const U_CENTER_X = U_X + 80;
const DOT_CY = U_Y + 80;

const centerY = (i: number) => 1 + i * (NODE_H + NODE_GAP) + NODE_H / 2;
const BUS_TOP = centerY(0);
const BUS_BOTTOM = centerY(NODES.length - 1);
const BUS_EXIT = centerY(2);

export function SystemsDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 542 444"
      role="img"
      aria-labelledby="systems-diagram-title"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <title id="systems-diagram-title">
        Spreadsheets, endless messages, manual processes, scattered information and disconnected
        tools, connected into one working system.
      </title>

      {NODES.map((label, i) => {
        const y = 1 + i * (NODE_H + NODE_GAP);
        return (
          <g key={label}>
            <rect x={1} y={y} width={NODE_W} height={NODE_H} />
            <text
              x={17}
              y={y + NODE_H / 2 + 5}
              fill="currentColor"
              stroke="none"
              fontSize={15}
              fontWeight={500}
            >
              {label}
            </text>
            <path d={`M${NODE_W + 2} ${centerY(i)}H${BUS_X}`} />
          </g>
        );
      })}

      <path d={`M${BUS_X} ${BUS_TOP}V${BUS_BOTTOM}`} />
      {/* Ends 16px above the dot: the same even gap the dot keeps from the U. */}
      <path d={`M${BUS_X} ${BUS_EXIT}H${U_CENTER_X}V${DOT_CY - 24 - 16}`} />

      <path
        transform={`translate(${U_X} ${U_Y}) scale(2)`}
        fill="currentColor"
        stroke="none"
        d="M0 0L0 40C0 62.091 17.909 80 40 80C62.091 80 80 62.091 80 40L80 0L60 0L60 40C60 51.046 51.046 60 40 60C28.954 60 20 51.046 20 40L20 0Z"
      />
      <circle cx={U_CENTER_X} cy={DOT_CY} r={24} className="fill-coral" stroke="none" />

      <text x={U_X} y={436} fill="currentColor" stroke="none" fontSize={15} fontWeight={600}>
        One working system
      </text>
    </svg>
  );
}
