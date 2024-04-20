"use client";

import { useState } from "react";
import { Button, ButtonColor, ButtonSize } from "@features/ui";
import { PlusIcon } from "@features/ui";
import styles from "./projects-interface.module.scss";
import { ProjectNewForm } from "@/features/projects";

export default function ProjectsInterface() {
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.header}>Projects</h1>
        <div className={styles.buttons}>
          <Button
            size={ButtonSize.Medium}
            color={ButtonColor.Primary}
            className={styles.button}
            onPress={() => setShowNewForm(true)}
            isDisabled={showNewForm}
            data-testid="projects-enable-new-btn"
          >
            <PlusIcon />
            New Project
          </Button>
        </div>
      </div>
      {showNewForm && <ProjectNewForm className={styles.form} />}
    </div>
  );
}
