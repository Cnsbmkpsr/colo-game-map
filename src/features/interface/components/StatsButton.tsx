import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Text,
    Flex,
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    VStack,
    HStack
} from "@chakra-ui/react";
import {observer} from "mobx-react";
import {factionStore} from "../../game/factionStore";
import {troopActions} from "../../game/troopActions";
import {landStore} from "../../game/landStore";
import {TROOP_TYPES, FACTION_COLORS} from "../../../shared/constants";
import {Civilisation, TroopTypes} from "../../game/types";
import {useMemo} from "react";

const StatsButton = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    // Calcul des statistiques par faction
    const factionStats = useMemo(() => {
        const stats = new Map();

        // Initialiser les stats pour toutes les factions
        factionStore.factions.forEach(faction => {
            stats.set(faction.name, {
                faction,
                totalLands: 0,
                totalTroops: 0,
                troopsByType: {
                    [TROOP_TYPES.INFANTRY]: 0,
                    [TROOP_TYPES.ARMORED_UNIT]: 0,
                    [TROOP_TYPES.AIR_UNIT]: 0,
                    [TROOP_TYPES.STRUCTURE]: 0,
                },
                totalAttack: 0,
                totalPV: 0,
                averageAttack: 0,
                averagePV: 0,
            });
        });

        // Compter les terres par faction
        landStore.lands.forEach(land => {
            const factionStat = stats.get(land.owner);
            if (factionStat) {
                factionStat.totalLands++;
            }
        });

        // Compter les troupes par faction et type
        troopActions.troops.forEach(troop => {
            const factionStat = stats.get(troop.civ);
            if (factionStat) {
                factionStat.totalTroops++;
                factionStat.troopsByType[troop.type]++;
                factionStat.totalAttack += troop.attack;
                factionStat.totalPV += troop.pv || 0;
            }
         });

        // Calculer les moyennes
        stats.forEach(stat => {
            if (stat.totalTroops > 0) {
                stat.averageAttack = Math.round(stat.totalAttack / stat.totalTroops);
                stat.averagePV = Math.round(stat.totalPV / stat.totalTroops);
            }
        });

        return Array.from(stats.values()).sort((a, b) => b.totalLands - a.totalLands);
    }, [landStore.lands, troopActions.troops, factionStore.factions]);

    const globalStats = useMemo(() => {
        return {
            totalLands: landStore.lands.length,
            totalTroops: troopActions.troops.length,
            totalFactions: factionStore.factions.length,
            activeFactions: factionStats.filter(stat => stat.totalLands > 0 || stat.totalTroops > 0).length
        };
    }, [factionStats, landStore.lands, troopActions.troops, factionStore.factions]);

    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme="blue"
                width="100%"
            >
                Stats
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay/>
                <ModalContent maxH="90vh" overflowY="auto">
                    <ModalHeader>Statistiques de la partie</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        {/* Statistiques globales */}
                        <Box mb={6} p={4} bg="gray.50" borderRadius="md">
                            <Text fontSize="lg" fontWeight="bold" mb={3}>Vue d'ensemble</Text>
                            <HStack spacing={6}>
                                <VStack>
                                    <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                                        {globalStats.totalLands}
                                    </Text>
                                    <Text fontSize="sm">Terres totales</Text>
                                </VStack>
                                <VStack>
                                    <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                                        {globalStats.totalTroops}
                                    </Text>
                                    <Text fontSize="sm">Troupes totales</Text>
                                </VStack>
                                <VStack>
                                    <Text fontSize="2xl" fontWeight="bold" color="green.500">
                                        {globalStats.activeFactions}
                                    </Text>
                                    <Text fontSize="sm">Factions actives</Text>
                                </VStack>
                            </HStack>
                        </Box>

                        {/* Tableau détaillé par faction */}
                        <TableContainer>
                            <Table variant="simple" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Faction</Th>
                                        <Th isNumeric>Terres</Th>
                                        <Th isNumeric>Troupes</Th>
                                        <Th>Infanterie</Th>
                                        <Th>Blindés</Th>
                                        <Th>Aérien</Th>
                                        <Th>Structures</Th>
                                        <Th isNumeric>Attaque moy.</Th>
                                        <Th isNumeric>PV moy.</Th>
                                        <Th isNumeric>Attaque totale</Th>
                                        <Th isNumeric>PV totaux</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {factionStats.map((stat) => (
                                        <Tr key={stat.faction.name}>
                                            <Td>
                                                <Flex align="center" gap={2}>
                                                    <Box
                                                        w="12px"
                                                        h="12px"
                                                        borderRadius="sm"
                                                        bg={FACTION_COLORS[stat.faction.name as Civilisation]}
                                                    />
                                                    <Text fontWeight="medium">{stat.faction.name}</Text>
                                                </Flex>
                                            </Td>
                                            <Td isNumeric>
                                                <Badge
                                                    colorScheme={stat.totalLands > 0 ? "purple" : "gray"}
                                                    variant={stat.totalLands > 0 ? "solid" : "outline"}
                                                >
                                                    {stat.totalLands}
                                                </Badge>
                                            </Td>
                                            <Td isNumeric>
                                                <Badge
                                                    colorScheme={stat.totalTroops > 0 ? "orange" : "gray"}
                                                    variant={stat.totalTroops > 0 ? "solid" : "outline"}
                                                >
                                                    {stat.totalTroops}
                                                </Badge>
                                            </Td>
                                            <Td isNumeric>{stat.troopsByType[TROOP_TYPES.INFANTRY]}</Td>
                                            <Td isNumeric>{stat.troopsByType[TROOP_TYPES.ARMORED_UNIT]}</Td>
                                            <Td isNumeric>{stat.troopsByType[TROOP_TYPES.AIR_UNIT]}</Td>
                                            <Td isNumeric>{stat.troopsByType[TROOP_TYPES.STRUCTURE]}</Td>
                                            <Td isNumeric>{stat.averageAttack}</Td>
                                            <Td isNumeric>{stat.averagePV}</Td>
                                            <Td isNumeric>{stat.totalAttack}</Td>
                                            <Td isNumeric>{stat.totalPV}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>

                        {/* Répartition par type de troupe */}
                        <Box mt={6} p={4} bg="gray.50" borderRadius="md">
                            <Text fontSize="lg" fontWeight="bold" mb={3}>Répartition des troupes</Text>
                            <HStack spacing={6}>
                                {Object.entries(TROOP_TYPES).map(([key, troopType]) => {
                                    const total = factionStats.reduce((sum, stat) =>
                                        sum + stat.troopsByType[troopType as TroopTypes], 0
                                    );
                                    return (
                                        <VStack key={key}>
                                            <Text fontSize="xl" fontWeight="bold" color="blue.500">
                                                {total}
                                            </Text>
                                            <Text fontSize="sm" textAlign="center">{troopType}</Text>
                                        </VStack>
                                    );
                                })}
                            </HStack>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default observer(StatsButton);