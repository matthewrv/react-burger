#!/bin/sh

component_name="$1"
component_type="$2" # should be component or page

[[ $component_name = "" ]] && echo "Specify component name in kebab style as an argument" && exit 1;
[[ $component_type = "" ]] && component_type="component"

mkdir src/${component_type}s/${component_name} || exit 1
touch src/${component_type}s/${component_name}/${component_name}.tsx
touch src/${component_type}s/${component_name}/${component_name}.module.css

component_name_camel=`echo ${component_name} | sed "s/[^-]\+/\u&/g ; s/-//g"`
component_name_camel_l=`echo ${component_name_camel} | sed "s/^./\L&/"`

cat > src/${component_type}s/${component_name}/${component_name}.tsx <<EOF
import React from "react"
import ${component_name_camel_l}Styles from "./${component_name}.module.css"

export default function ${component_name_camel}(props) {
  return <></>
}
EOF

echo "Component created successfully"
echo "Open src/${component_type}s/${component_name}/${component_name}.tsx to start coding"
